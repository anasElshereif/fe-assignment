import { Tooltip } from 'antd';
import Image from 'next/image';
import AltTooltipIcon from '../../public/icons/alt-tooltip.svg';

export default function AltTooltip({ title, placement }) {
  return (
    <Tooltip
      title={title}
      placement={placement}
      color="#1E1E1E"
      overlayInnerStyle={{ padding: '18px', lineHeight: '160%' }}
      overlayStyle={{ width: '210px' }}
    >
      <Image src={AltTooltipIcon} alt="tooltip" />
    </Tooltip>
  );
}
