import Avatar from '@/components/icons/Avatar';
import ProgressBar from '@/components/ProgressBar';
import { HEADLINE, NAME } from '@/utils/constant';

export default function Sidebar({ data }) {
  // get all pages
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const getAllCurrentPage = data.map((page) => page.current_page);
  const getAllTotalPage = data.map((page) => page.total_page);

  const TotalPage = getAllTotalPage.reduce(reducer);
  const CurrentPage = getAllCurrentPage.reduce(reducer);

  // get finished books
  const wasRead = data.map((book) => book.status);
  const FinishedBook = wasRead.filter((item) => item == 'Finished').length;

  return (
    <aside className="h-[95vh] min-w-[255px] border-gray-100/90 fixed bottom-5 left-5 top-5 hidden bg-white border rounded-3xl lg:block">
      <div className="flex flex-col px-6">
        <div className="flex flex-col items-center my-5 text-center">
          <Avatar />
          <h1 className="mb-1 mt-5 text-lg font-medium">{NAME}</h1>
          <h3 className="relative w-3/4 text-gray-400 text-sm italic">
            {HEADLINE}
          </h3>
        </div>
        <section className="mt-14 space-y-8">
          <div className="space-y-1">
            <h2 className="text-gray-400 text-sm">Buku</h2>
            <div className="flex items-center justify-between">
              <h3 className="w-20 text-2xl font-bold tracking-tighter">
                {data.length}
              </h3>
              <ProgressBar current={FinishedBook} total={data.length} />
            </div>
          </div>
          <div className="space-y-1">
            <h2 className="text-gray-400 text-sm">Halaman</h2>
            <div className="flex items-center justify-between">
              <h3 className="inline-flex items-center w-20 text-2xl font-bold tracking-tighter">
                {TotalPage.toString().slice(0, 1)}K{' '}
                <span className="text-[16px] font-normal">++</span>
              </h3>
              <ProgressBar current={CurrentPage} total={TotalPage} />
            </div>
          </div>
        </section>
      </div>
    </aside>
  );
}
