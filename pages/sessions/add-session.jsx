import Link from 'next/link';
import { Spin, Form } from 'antd';
import { useState } from 'react';
import PageHeader from '../../components/page-header/page-header';
import SessionForm from '../../components/session/session-form';

export default function AddSession() {
  const [addSession] = Form.useForm();
  const [formSpin] = useState(false);
  return (
    <main className="page">
      <PageHeader prevPage={{ route: '/sessions', title: 'All Sessions' }} pageTitle="New Sessions">
        <div className="flex action-btns gap-1">
          <Link href="/sessions">
            <button type="button" className="l-dark-bg wc action-btn">
              Cancel
            </button>
          </Link>
          <button type="button" className="wc-bg l-dark action-btn">
            Next
          </button>
        </div>
      </PageHeader>
      <div className="wide flex-row-c mt-22">
        <Spin spinning={formSpin}>
          <div className="session-form">
            <Form form={addSession} layout="vertical">
              <SessionForm type="add" />
            </Form>
          </div>
        </Spin>
      </div>
    </main>
  );
}
