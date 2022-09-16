import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import { ITransactionResponse } from "common/APISpec/transaction/types";

export function TransactionTableRow({
  transaction,
}: {
  transaction: ITransactionResponse;
}): JSX.Element {
  // TODO: Styling + i18n
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="right">
          {transaction.date.toString()}
        </TableCell>
        <TableCell>{transaction.note}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table
              size="small"
              aria-label="Entries"
              //TODO: Refactor sub table to another component
              //TODO: Create input/edit form
            >
              <TableHead>
                <TableRow>
                  <TableCell>Account</TableCell>
                  <TableCell>Note</TableCell>
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transaction.entries.map((entryRow) => (
                  <TableRow key={entryRow.account}>
                    {/*TODO: key is probably wrong */}
                    <TableCell component="th" scope="row">
                      {entryRow.account}
                    </TableCell>
                    <TableCell>{entryRow.note}</TableCell>
                    {/*TODO: Add debit/credit columns */}
                    <TableCell align="right">{entryRow.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export const TransactionTable = ({
  transactions,
}: {
  transactions: ITransactionResponse[];
}): JSX.Element => (
  <TableContainer component={Paper}>
    <Table aria-label="transaction table">
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell align="right">Date</TableCell>
          <TableCell>Note</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {transactions.map((row: ITransactionResponse) => (
          <TransactionTableRow
            key={row.date /*TODO: this is wrong*/}
            transaction={row}
          />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
