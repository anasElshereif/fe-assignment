import Link from 'next/link';
import Image from 'next/image';
import Prev from '../../public/icons/prev.svg';

export default function PageHeader({ prevPage, pageTitle, children }) {
  return (
    <header className="page-header flex-row-btw">
      <div className="flex-col gap-5">
        <Link href={prevPage.route || '/'}>
          <span className="flex gap-3 prev-route">
            <Image src={Prev} alt="go back" />
            <span className="f-14 fw-4 d-wc">{prevPage.title}</span>
          </span>
        </Link>
        <h1 className="wc f-20 fw-7">{pageTitle}</h1>
      </div>
      <div>{children}</div>
    </header>
  );
}
