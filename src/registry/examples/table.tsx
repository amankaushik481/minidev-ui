"use client"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/registry/ui/table"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Invoice lines with a total",
    description: "Right-align money, sum it in TableFooter and name the table with TableCaption.",
    code: `<div className="w-full max-w-lg">
  <Table>
    <TableCaption>Invoice INV-2041 for Northwind Labs</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Item</TableHead>
        <TableHead className="text-right">Qty</TableHead>
        <TableHead className="text-right">Amount</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>Team plan seats</TableCell>
        <TableCell className="text-right">24</TableCell>
        <TableCell className="text-right">$1,176.00</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Extra storage, 200 GB</TableCell>
        <TableCell className="text-right">2</TableCell>
        <TableCell className="text-right">$40.00</TableCell>
      </TableRow>
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell colSpan={2}>Total</TableCell>
        <TableCell className="text-right">$1,216.00</TableCell>
      </TableRow>
    </TableFooter>
  </Table>
</div>`,
    node: (
      <div className="w-full max-w-lg">
        <Table>
          <TableCaption>Invoice INV-2041 for Northwind Labs</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead className="text-right">Qty</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Team plan seats</TableCell>
              <TableCell className="text-right">24</TableCell>
              <TableCell className="text-right">$1,176.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Extra storage, 200 GB</TableCell>
              <TableCell className="text-right">2</TableCell>
              <TableCell className="text-right">$40.00</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell className="text-right">$1,216.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    ),
  },
  {
    title: "Mapped rows with a selected one",
    description: "Map data into rows; aria-selected tints the row you are looking at.",
    code: `<div className="w-full max-w-lg">
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Deploy</TableHead>
        <TableHead>Branch</TableHead>
        <TableHead className="text-right">Duration</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {[
        { id: "dpl_412", branch: "main", time: "1m 48s" },
        { id: "dpl_411", branch: "fix/vat-rounding", time: "2m 10s" },
        { id: "dpl_410", branch: "main", time: "1m 52s" },
      ].map((d) => (
        <TableRow key={d.id} aria-selected={d.id === "dpl_411"}>
          <TableCell className="font-mono text-xs">{d.id}</TableCell>
          <TableCell className="text-fg-muted">{d.branch}</TableCell>
          <TableCell className="text-right">{d.time}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>`,
    node: (
      <div className="w-full max-w-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Deploy</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead className="text-right">Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { id: "dpl_412", branch: "main", time: "1m 48s" },
              { id: "dpl_411", branch: "fix/vat-rounding", time: "2m 10s" },
              { id: "dpl_410", branch: "main", time: "1m 52s" },
            ].map((d) => (
              <TableRow key={d.id} aria-selected={d.id === "dpl_411"}>
                <TableCell className="font-mono text-xs">{d.id}</TableCell>
                <TableCell className="text-fg-muted">{d.branch}</TableCell>
                <TableCell className="text-right">{d.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    ),
  },
]
