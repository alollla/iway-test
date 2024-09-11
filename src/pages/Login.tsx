import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, Typography } from 'antd';

import type { LoginFormType } from '@/types';
import { useAuthMutation } from '@/api';
import { setCredentials } from '@/store/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [auth, { error }] = useAuthMutation();
    const navigate = useNavigate();

    const onFinish: FormProps<LoginFormType>['onFinish'] = (values) => {
        auth(values)
            .then(response => {
                console.log(response)
                if (!response.error) {
                    setCredentials({ token: response.data.result.token });
                    navigate('/')
                }
            })
    }

    return (
        <Form
            name="auth"
            colon={false}
            requiredMark={false}
            layout='vertical'
            style={{ maxWidth: 300 }}
            initialValues={{ login: 'testUser', password: 'qwezxc' }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item<LoginFormType>
                label="Login"
                name="login"
                rules={[{ required: true, message: 'Please input your login!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<LoginFormType>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Submit
                </Button>
            </Form.Item>
            {/* @ts-ignore */}
            {error?.data?.error ? <Typography.Text type="danger">{error.data.error.message}</Typography.Text> : null}
        </Form>
    )
}

export default LoginPage