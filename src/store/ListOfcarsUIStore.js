import { makeAutoObservable } from 'mobx';

class ListOfcarsUIStore {

  page = 0;
  rowsPerPage= 5
  valueToOrderBy ='name'
  orederDirection='asc'
  snackBarState = false;
  


  constructor() {
    makeAutoObservable(this);
  }

  descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  getComparator = (order, orderBy) =>
    order === 'desc'
      ? (a, b) => this.descendingComparator(a, b, orderBy)
      : (a, b) => -this.descendingComparator(a, b, orderBy);

  stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };


   handleChangePage = (event, newPage) => {
    this.page = newPage
  };

   handleChangeRowsPerPage = (event) => {
    this.rowsPerPage= parseInt(event.target.value, 10)
    this.page=0
  };

  handleRequestSort = (event, property) => {
    const isAscending =
      this.valueToOrderBy === property && this.orederDirection === 'asc';
    this.valueToOrderBy= property
    this.orederDirection = isAscending ? 'desc' : 'asc'
  };

  createSortHandler = (property) => (event) => {
    this.handleRequestSort(event, property);
  };

  setOpenSnack=(open)=> {
    this.snackBarState = open;
  }

 
}

const listOfcarsUIStore = new ListOfcarsUIStore();

export default listOfcarsUIStore;
