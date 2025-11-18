// import React, { PureComponent } from 'react';

// class Pagination extends PureComponent {
//   render() {
//     const { itemsPerPage, totalItems, paginate, currentPage } = this.props;
//     console.log("Pagination rendered at", new Date().toLocaleTimeString());

//     const pageNumbers = [];
//     for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
//       pageNumbers.push(i);
//     }

//     // Không cần phân trang nếu chỉ có 1 trang
//     if (pageNumbers.length <= 1) {
//       return null;
//     }

//     return (
//       <nav className="pagination-container">
//         <ul className="pagination">
//           {pageNumbers.map(number => (
//             <li
//               key={number}
//               className={`page-item ${currentPage === number ? 'active' : ''}`}
//             >
//               <button
//                 onClick={() => paginate(number)}
//                 className="page-link"
//               >
//                 {number}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     );
//   }
// }

// export default Pagination;
