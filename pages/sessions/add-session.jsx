import Link from 'next/link';
import PageHeader from '../../components/page-header/page-header';
import SessionForm from '../../components/session/session-form';

export default function AddSession() {
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
        <SessionForm type="add" />
      </div>
    </main>
  );
}
