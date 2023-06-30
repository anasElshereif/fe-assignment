import Link from 'next/link';
import { Spin, Form, message } from 'antd';
import { useState } from 'react';
import dayjs from 'dayjs';
import PageHeader from '../../components/page-header/page-header';
import SessionForm from '../../components/session/session-form';
import SessionService from '../../services/session/session';

export default function AddSession() {
  const [addSession] = Form.useForm();
  const [formSpin, setFormSpin] = useState(false);

  // form state
  const [thumbnailImg, setThumbnailImg] = useState();
  const [selectedSpeakers, setSelectedSpeakers] = useState();
  const [selectedModerators, setSelectedModerators] = useState();

  // get ids array from users array
  const getUsersIds = (list) => list.map((item) => item.id);

  // format payload
  const formatPayload = (values) => {
    const formattedDate = dayjs(values.date).format('YYYY-MM-DD');
    const formattedFrom = `${values.from.$H}:${values.from.$m}`;
    const formattedTill = `${values.till.$H}:${values.till.$m}`;

    const payloadObj = {
      ...values,
      date: formattedDate,
      from: formattedFrom,
      till: formattedTill,
      event_id: 8,
    };

    delete payloadObj.speaker_ids;
    delete payloadObj.moderator_ids;
    delete payloadObj.cover_image;
    delete payloadObj.venue; // not allowed in be endpoint

    const payload = new FormData();
    payload.append('cover_image', thumbnailImg);
    getUsersIds(selectedSpeakers).forEach((speaker) => {
      payload.append('speaker_ids[]', speaker);
    });
    getUsersIds(selectedModerators).forEach((moderator) => {
      payload.append('moderator_ids[]', moderator);
    }); // appending array into form data
    const valuesObjKeys = Object.keys(payloadObj);
    valuesObjKeys.forEach((value) => {
      payload.append(value, payloadObj[value]);
    });
    return payload;
  };

  // reset selected users
  const [resetSelectedFields, setResetSelectedFields] = useState(false);

  // create session
  const createSession = (values) => {
    setFormSpin(true);
    const payload = formatPayload(values);
    SessionService.CreateSession(payload)
      .then(() => {
        addSession.resetFields();
        setResetSelectedFields(true);
        message.success('Successfully created session');
      })
      .catch(() => {
        message.error('Error occurred while creating session');
        addSession.resetFields(['title']);
      })
      .finally(() => {
        setFormSpin(false);
      });
  };

  return (
    <main className="page">
      <PageHeader prevPage={{ route: '/sessions', title: 'All Sessions' }} pageTitle="New Sessions">
        <div className="flex action-btns gap-1">
          <Link href="/sessions">
            <button type="button" className="l-dark-bg wc action-btn">
              Cancel
            </button>
          </Link>
          <button
            type="button"
            className="wc-bg l-dark action-btn"
            onClick={() => {
              addSession.submit();
            }}
          >
            Create
          </button>
        </div>
      </PageHeader>
      <div className="wide flex-row-c mt-22 mb-40">
        <Spin spinning={formSpin}>
          <div className="session-form">
            <Form form={addSession} layout="vertical" onFinish={createSession} scrollToFirstError>
              <SessionForm
                type="add"
                thumbnailImg={(file) => {
                  setThumbnailImg(file);
                }}
                selectedSpeakers={(speakers) => {
                  setSelectedSpeakers(speakers);
                }}
                selectedModerators={(speakers) => {
                  setSelectedModerators(speakers);
                }}
                resetSelectedUsers={resetSelectedFields}
                resetSelectedVenue={resetSelectedFields}
                resetFieldOnEmpty={(value) => {
                  addSession.resetFields([value]);
                }}
              />
            </Form>
          </div>
        </Spin>
      </div>
    </main>
  );
}
