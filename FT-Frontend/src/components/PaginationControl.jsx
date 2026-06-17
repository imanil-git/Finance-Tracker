import Pagination from "react-bootstrap/Pagination";
import { useTransactionStore } from "../store/useTransactionStore";

const PaginationControl = () => {
  const { pagination, getTransactions } = useTransactionStore();

  const pages = [];

  for (let i = 1; i <= pagination.totalPages; i++) {
    pages.push(i);
  }

  if (pages.length <= 1) return null;

  return (
    <div className="d-flex justify-content-center mt-4">
      <Pagination>
        <Pagination.Prev
          disabled={pagination.currentPage === 1}
          onClick={() => getTransactions(pagination.currentPage === 1)}
        />

        {pages.map((page) => (
          <Pagination.Item
            key={page}
            active={page === pagination.currentPage}
            onClick={() => getTransactions(page)}
          >
            {page}
          </Pagination.Item>
        ))}

        <Pagination.Next
          disabled={pagination.currentPage === pagination.totalPages}
          onClick={() => getTransactions(pagination.currentPage + 1)}
        />
      </Pagination>
    </div>
  );
};

export default PaginationControl;
