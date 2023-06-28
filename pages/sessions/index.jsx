import { Button } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import AddIcon from '../../public/icons/add.svg';

export default function Sessions() {
  return (
    <div className="flex-row-c gap-20" style={{ height: '100vh' }}>
      <Link href="/sessions/add-session">
        <Button className="wc-bg mc pdtb-10 pdrl-16 flex-row-c gap-8">
          <Image src={AddIcon} alt="add" />
          Add Session
        </Button>
      </Link>
    </div>
  );
}
