import { Button } from 'antd';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex-row-c" style={{ height: '100vh' }}>
      <Link href="/sessions">
        <Button className="wc-bg mc pdtb-10 pdrl-16 flex-row-c gap-8">Go To Sessions</Button>
      </Link>
    </div>
  );
}
