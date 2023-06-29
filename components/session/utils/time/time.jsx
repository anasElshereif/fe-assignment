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
    <div className="flex gap-30">
      <Form.Item
        label="Date"
        name="date"
        rules={[
          {
            required: true,
            message: 'Please select date !',
          },
        ]}
        className="session-input-item"
      >
        <DatePicker
          className="wide"
          format="YYYY-MM-DD"
          placeholder="Jan . 01 . 2022"
          disabledDate={disabledDate}
          style={{ width: '355px' }}
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
        className="session-input-item width-25"
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
        className="session-input-item width-25"
      >
        {TimePicker()}
      </Form.Item>
    </div>
  );
}
