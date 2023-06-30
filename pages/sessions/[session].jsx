import Link from 'next/link';
import { Spin, Form, message } from 'antd';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import PageHeader from '../../components/page-header/page-header';
import SessionForm from '../../components/session/session-form';
import SessionService from '../../services/session/session';

export default function Session() {
  const [sessionForm] = Form.useForm();
  const [formSpin, setFormSpin] = useState(true);

  // form state
  const [, setThumbnailImg] = useState();
  const [, setSelectedSpeakers] = useState();
  const [, setSelectedModerators] = useState(); // state is empty because there is no update endpoint for session

  // session router id
  const router = useRouter();
  const { session } = router.query;

  // session state
  const [sessionData, setSessionData] = useState();
  const [initialValues, setInitialValues] = useState({});

  // fetching session
  useEffect(() => {
    if (!session) return;
    SessionService.GetSingleSession(session)
      .then((res) => {
        const { data } = res;
        const initialValuesObj = {
          title: data.title,
          subtitle: data.subtitle,
          date: dayjs(data.date, 'YYYY-MM-DD'),
          from: dayjs(data.from, 'HH:mm'),
          till: dayjs(data.till, 'HH:mm'),
          description: data.description,
        };
        setInitialValues(initialValuesObj);
        setSessionData(data);
      })
      .catch(() => {
        message.error('error occurred while fetching session');
      })
      .finally(() => {
        setFormSpin(false);
      });
  }, [session]);
  useEffect(() => sessionForm.resetFields(), [initialValues]); // resetting form fields to refresh initial values

  return (
    <main className="page">
      <PageHeader prevPage={{ route: '/sessions', title: 'All Sessions' }} pageTitle={sessionData?.title || 'Session'}>
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
            <Form form={sessionForm} layout="vertical" initialValues={initialValues}>
              <SessionForm
                type="prefilled"
                prefilledData={{
                  cover_image: sessionData?.cover_image,
                  speakers: sessionData?.speakers,
                  moderators: sessionData?.moderators,
                  venue: sessionData?.venue,
                }}
                thumbnailImg={(file) => {
                  setThumbnailImg(file);
                }}
                selectedSpeakers={(speakers) => {
                  setSelectedSpeakers(speakers);
                }}
                selectedModerators={(speakers) => {
                  setSelectedModerators(speakers);
                }}
              />
            </Form>
          </div>
        </Spin>
      </div>
    </main>
  );
}
