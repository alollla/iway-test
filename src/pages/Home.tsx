import { useState } from 'react';
import { List, Input, Select, Form, Button, Modal, Descriptions } from 'antd';

import { useGetTripsQuery } from "@/api";
import { ITripsSearchParams } from '@/types';
import { STATUSES } from '@/constants';

export default function HomePage() {
    const [params, setParams] = useState<ITripsSearchParams>({
        page: 1,
    });
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedTrip, setSelectedTrip] = useState<any | null>(null);

    const { data, isFetching } = useGetTripsQuery(params);

    const onPaginationChange = (page: number) => {
        setParams({
            ...params,
            page,
        })
    }

    const onSearch = (values: {
        names?: string,
        email?: string,
        order_status?: number | number[],
    }) => {
        setParams({
            ...params,
            ...values,
        })
    }

    const onMore = (trip: any) => {
        setSelectedTrip(trip)
        setIsModalOpen(true)
    }

    const onCloseModal = () => {
        setSelectedTrip(null)
        setIsModalOpen(false)
    }

    return (
        <>
            <div className='filters'>
                <Form
                    name="filters"
                    layout='horizontal'
                    labelCol={{ span: 3 }}
                    wrapperCol={{ md: 12, lg: 6 }}
                    requiredMark={false}
                    onFinish={onSearch}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Имя"
                        name="names"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Статус"
                        name="order_status"
                    >
                        <Select
                            mode="multiple"
                            maxTagCount={1}
                            style={{ width: '100%' }}
                            options={STATUSES.map((s, i) => ({ label: s, value: i }))}
                        />
                    </Form.Item>

                    <Form.Item label=" " colon={false}>
                        <Button type="primary" htmlType="submit" block>
                            Поиск
                        </Button>
                    </Form.Item>
                </Form>

            </div>
            <List
                className='trips-list'
                itemLayout="horizontal"
                loading={isFetching}
                dataSource={data?.result?.orders}
                pagination={{
                    position: 'bottom',
                    align: 'center',
                    defaultPageSize: 11,
                    size: 'small',
                    total: data?.result?.page_data?.total_items | 0,
                    showSizeChanger: false,
                    hideOnSinglePage: true,
                    onChange: onPaginationChange
                }}
                renderItem={(item: any) => (
                    <List.Item
                        actions={[<a key="more" onClick={() => onMore(item)}>Подробнее</a>]}
                    >
                        <List.Item.Meta
                            title={`${item.customer.name || 'UNKNOWN'} / ${item.customer.email || 'UNKNOWN'}`}
                            description={`${STATUSES[item.status]} / ${item.location_address} - ${item.destination_address}`}
                        />
                    </List.Item>
                )}
            />
            <Modal
                width={700}
                open={isModalOpen}
                centered={true}
                cancelText={"Закрыть"}
                onCancel={onCloseModal}
                footer={(_, { CancelBtn }) => (
                    <CancelBtn />
                )}
            >
                <Descriptions
                    title={`${selectedTrip?.customer.name || 'UNKNOWN'} / ${selectedTrip?.customer.email || 'UNKNOWN'}`}
                    column={1}
                >
                    <Descriptions.Item label="Дата бронирования">{selectedTrip?.date}</Descriptions.Item>
                    <Descriptions.Item label="Дата прибытия">{selectedTrip?.date_arrival}</Descriptions.Item>
                    <Descriptions.Item label="Дата отъезда">{selectedTrip?.date_departure}</Descriptions.Item>
                    <Descriptions.Item label="Статус заказа">{STATUSES[selectedTrip?.status]}</Descriptions.Item>
                    <Descriptions.Item label="Адрес">{selectedTrip?.address}</Descriptions.Item>
                    <Descriptions.Item label="Адрес местоположения">{selectedTrip?.location_address}</Descriptions.Item>
                    <Descriptions.Item label="Целевой адрес">{selectedTrip?.destination_address}</Descriptions.Item>
                </Descriptions>
            </Modal>
        </>
    )
}