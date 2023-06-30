import Image from 'next/image';
import { Form, DatePicker } from 'antd';
import DropdownIcon from '../../../../public/icons/vector.svg';

export default function Time() {
  // disabled past dates
  const disabledDate = (current) => {
    // Get the current day date
    const currentDate = new Date().setHours(0, 0, 0, 0);

    // Disable all dates before the current day date
    return current && current < currentDate;
  };

  const TimePicker = () => (
    <DatePicker
      className="wide"
      picker="time"
      format="HH:mm"
      placeholder="00:00 AM" // be endpoint use 24 format
      suffixIcon={<Image src={DropdownIcon} alt="dropdown" />}
    />
  );
  return (
    <div className="flex gap-30 time-container">
      <Form.Item
        label="Date"
        name="date"
        rules={[
          {
            required: true,
            message: 'Please select date !',
          },
        ]}
        className="session-input-item date-picker"
      >
        <DatePicker
          className="wide picker"
          format="YYYY-MM-DD"
          placeholder="Jan . 01 . 2022"
          disabledDate={disabledDate}
          suffixIcon={<Image src={DropdownIcon} alt="dropdown" />}
        />
      </Form.Item>
      <Form.Item
        label="From"
        name="from"
        rules={[
          {
            required: true,
            message: 'Please select from time !',
          },
        ]}
        className="session-input-item width-25 time-picker"
      >
        {TimePicker()}
      </Form.Item>
      <Form.Item
        label="Till"
        name="till"
        rules={[
          {
            required: true,
            message: 'Please select till time !',
          },
        ]}
        className="session-input-item width-25 time-picker"
      >
        {TimePicker()}
      </Form.Item>
    </div>
  );
}
