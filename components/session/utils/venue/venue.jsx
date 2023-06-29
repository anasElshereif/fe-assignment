import { Select, Form } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
import DropdownIcon from '../../../../public/icons/vector.svg';

export default function VenueSelect() {
  // venues hardcoded values (no be endpoint provided)
  const [venues] = useState([
    {
      id: 1,
      label: 'Lusail Stadium',
      capacity: 3,
      image: 'https://www.stadiumguide.com/wp-content/uploads/khalifanew_top.jpg',
    },
    {
      id: 2,
      label: 'Cairo Stadium',
      capacity: 4,
      image: 'https://www.stadiumguide.com/wp-content/uploads/cairo_top1.jpg',
    },
    {
      id: 3,
      label: 'Istanbul Stadium',
      capacity: 5,
      image: 'https://www.stadiumguide.com/wp-content/uploads/ataturk_top.jpg',
    },
  ]);

  // venue value
  const [venue, setVenue] = useState();
  const changeVenue = (value) => {
    setVenue(venues.filter((item) => item.id === value)[0]);
  };

  return (
    <>
      <Form.Item label="Venue" name="venue" className="mb-0">
        <Select
          placeholder="Select"
          optionLabelProp="label"
          suffixIcon={<Image src={DropdownIcon} alt="dropdown" />}
          popupClassName="venue-select-dropdown"
          options={[
            {
              value: 1,
              label: 'Lusail Stadium',
            },
            {
              value: 2,
              label: 'Cairo Stadium',
            },
            {
              value: 3,
              label: 'Istanbul Stadium',
            },
          ]}
          onChange={(value) => {
            changeVenue(value);
          }}
        />
      </Form.Item>
      {venue && (
        <div className="venue-card mt-30 flex">
          <Image src={venue.image} alt={venue.label} width={180} height={85} />
          <div className="content flex-col gap-5">
            <h2 className="wc fw-7">{venue.label}</h2>
            <span className="l-gc f-12 fw-4">Venue Capacity: {venue.capacity.toFixed(3)}</span>
          </div>
        </div>
      )}
    </>
  );
}
