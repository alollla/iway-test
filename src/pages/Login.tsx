import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, Typography } from 'antd';

import type { LoginFormType } from '@/types';
import { useAuthMutation } from '@/api';
import { setCredentials } from '@/store/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const LoginPage: React.FC = () => {
    const [auth, { error }] = useAuthMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish: FormProps<LoginFormType>['onFinish'] = (values) => {
        auth(values)
            .then(({ data }) => {
                if (!data.error) {
                    dispatch(setCredentials({ token: data.result.token }));
                    navigate('/');
                }
            })
    }

    return (
        <div className='login-form-wrap'>
            <Form
                name="auth"
                colon={false}
                requiredMark={false}
                layout='vertical'
                style={{ maxWidth: 300 }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item<LoginFormType>
                    label="Логин"
                    name="login"
                    rules={[{ required: true, message: 'Введите логин' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<LoginFormType>
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Введите пароль' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Войти
                    </Button>
                </Form.Item>
                {/* @ts-ignore */}
                {error?.data?.error ? <Typography.Text type="danger">{error.data.error.message}</Typography.Text> : null}
            </Form>
        </div>
    )
}

export default LoginPage