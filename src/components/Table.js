import { Table as BootstrapTable } from "react-bootstrap";
import { createKey } from "../utils";

const Table = ({ columns, rows }) => {
  return (
    <BootstrapTable striped bordered hover responsive>
      <thead>
        <tr>
          {columns?.map((column) => (
            <th key={createKey(column)}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows?.map((row) => {
          const keys = Object.keys(row);
          return (
            <tr key={createKey(`${row[keys[0]]}_${row[keys.slice(-1)[0]]}`)}>
              {keys.map((key) => (
                <td key={createKey(`${key}_${row[key]}`)}>{row[key]}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </BootstrapTable>
  );
};

export default Table;
