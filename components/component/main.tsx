"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import Link from "next/link"
import Image from 'next/image';
import logo from '@/components/ui/logo.png';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function Listing() {
  const [filters, setFilters] = useState({
    revenueFigure: null,
    ebitda: null,
    profit: null,
    debt: null,
    numPeople: null,
    revenue: null,
    sellingPrice: null,
    listingDate: null,
  })
  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState("asc")
  const [isTableView, setIsTableView] = useState(false)
  const businesses = [
    {
      name: "Acme Inc.",
      createdAt: "2015-06-01",
      geography: "San Francisco, CA",
      sector: "Technology",
      capex: 250000,
      siret: "12345678901234",
      website: "www.acme.com",
      description: "Innovative software solutions for enterprises.",
      reasonForSelling: "Founders are retiring",
      sellingPrice: 5000000,
      listingDate: "2023-06-01",
      revenue: [1000000, 1200000, 1500000],
      ebitda: [300000, 400000, 500000],
      profit: [200000, 250000, 300000],
      debt: 500000,
      numPeople: 50,
      contact: {
        phone: "555-1234",
        email: "info@acme.com",
      },
    },
    {
      name: "Widgets Co.",
      createdAt: "2010-03-15",
      geography: "Chicago, IL",
      sector: "Manufacturing",
      capex: 150000,
      siret: "98765432109876",
      website: "www.widgetsco.com",
      description: "Manufacturer of high-quality widgets.",
      reasonForSelling: "Owners are looking to retire",
      sellingPrice: 2500000,
      listingDate: "2023-05-15",
      revenue: [800000, 900000, 1000000],
      ebitda: [200000, 250000, 300000],
      profit: [150000, 180000, 220000],
      debt: 300000,
      numPeople: 30,
      contact: {
        phone: "555-5678",
        email: "info@widgetsco.com",
      },
    },
    {
      name: "Gizmos LLC",
      createdAt: "2018-11-01",
      geography: "Seattle, WA",
      sector: "Retail",
      capex: 100000,
      siret: "54321098765432",
      website: "www.gizmosllc.com",
      description: "Retailer of unique gizmos and gadgets.",
      reasonForSelling: "Owners are moving out of state",
      sellingPrice: 1000000,
      listingDate: "2023-04-01",
      revenue: [500000, 600000, 700000],
      ebitda: [100000, 150000, 200000],
      profit: [80000, 100000, 120000],
      debt: 150000,
      numPeople: 20,
      contact: {
        phone: "555-9012",
        email: "info@gizmosllc.com",
      },
    },
  ]
  const filteredBusinesses = useMemo(() => {
    return businesses.filter((business) => {
      return (
        (!filters.revenueFigure || business.revenue[2] >= filters.revenueFigure) &&
        (!filters.ebitda || business.ebitda[2] >= filters.ebitda) &&
        (!filters.profit || business.profit[2] >= filters.profit) &&
        (!filters.debt || business.debt <= filters.debt) &&
        (!filters.numPeople || business.numPeople >= filters.numPeople) &&
        (!filters.revenue || business.revenue[2] >= filters.revenue) &&
        (!filters.sellingPrice || business.sellingPrice >= filters.sellingPrice) &&
        (!filters.listingDate || new Date(business.listingDate) >= new Date(filters.listingDate))
      )
    })
  }, [filters])
  const sortedBusinesses = useMemo(() => {
    return filteredBusinesses.sort((a, b) => {
      if (sortBy === "name") {
          return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else if (sortBy === "createdAt") {
          return sortOrder === "asc" 
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() 
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === "sellingPrice") {
          return sortOrder === "asc" ? a.sellingPrice - b.sellingPrice : b.sellingPrice - a.sellingPrice;
      } else if (sortBy === "listingDate") {
          return sortOrder === "asc" 
          ? new Date(a.listingDate).getTime() - new Date(b.listingDate).getTime() 
          : new Date(b.listingDate).getTime() - new Date(a.listingDate).getTime();
      } else {
          return 0;
      }
    })
  }, [filteredBusinesses, sortBy, sortOrder])
  const handleFilterChange = (key: string, value: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }))
  }

  const handleSortChange = (key: string, value: any) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      // @ts-ignore
      setSortBy(key)
      setSortOrder("asc")
    }
  }
  const handleViewChange = () => {
    setIsTableView(!isTableView)
  }
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="mb-8">
        <Image
          src={logo}
          alt="Logo"
        />
        <p className="text-muted-foreground">Find the perfect business opportunity for you.</p>
      </div>
      <div className="bg-background rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label htmlFor="revenueFigure" className="text-sm font-medium">
              Revenue Figure
            </label>
            <Input
              id="revenueFigure"
              type="number"
              placeholder="Enter revenue figure"
              value={filters.revenueFigure || ""}
              onChange={(e) => handleFilterChange("revenueFigure", e.target.value ? parseInt(e.target.value) : null)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="ebitda" className="text-sm font-medium">
              EBITDA
            </label>
            <Input
              id="ebitda"
              type="number"
              placeholder="Enter EBITDA"
              value={filters.ebitda || ""}
              onChange={(e) => handleFilterChange("ebitda", e.target.value ? parseInt(e.target.value) : null)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="profit" className="text-sm font-medium">
              Profit
            </label>
            <Input
              id="profit"
              type="number"
              placeholder="Enter profit"
              value={filters.profit || ""}
              onChange={(e) => handleFilterChange("profit", e.target.value ? parseInt(e.target.value) : null)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="debt" className="text-sm font-medium">
              Debt
            </label>
            <Input
              id="debt"
              type="number"
              placeholder="Enter debt"
              value={filters.debt || ""}
              onChange={(e) => handleFilterChange("debt", e.target.value ? parseInt(e.target.value) : null)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="numPeople" className="text-sm font-medium">
              Number of People
            </label>
            <Input
              id="numPeople"
              type="number"
              placeholder="Enter number of people"
              value={filters.numPeople || ""}
              onChange={(e) => handleFilterChange("numPeople", e.target.value ? parseInt(e.target.value) : null)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="revenue" className="text-sm font-medium">
              Revenue
            </label>
            <Input
              id="revenue"
              type="number"
              placeholder="Enter revenue"
              value={filters.revenue || ""}
              onChange={(e) => handleFilterChange("revenue", e.target.value ? parseInt(e.target.value) : null)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="sellingPrice" className="text-sm font-medium">
              Selling Price
            </label>
            <Input
              id="sellingPrice"
              type="number"
              placeholder="Enter selling price"
              value={filters.sellingPrice || ""}
              onChange={(e) => handleFilterChange("sellingPrice", e.target.value ? parseInt(e.target.value) : null)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="listingDate" className="text-sm font-medium">
              Listing Date
            </label>
            <Input
              id="listingDate"
              type="date"
              value={filters.listingDate || ""}
              onChange={(e) => handleFilterChange("listingDate", e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="bg-background rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Business Listings</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handleViewChange}>
              {isTableView ? <LayoutGridIcon className="h-5 w-5" /> : <ListIcon className="h-5 w-5" />}
              <span className="sr-only">{isTableView ? "Switch to Card View" : "Switch to Table View"}</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Sort by <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup value={sortBy} onValueChange={handleSortChange}>
                  <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="createdAt">Created At</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="sellingPrice">Selling Price</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="listingDate">Listing Date</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {isTableView ? (
          <div className="border shadow-sm rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Geography</TableHead>
                  <TableHead>Sector</TableHead>
                  <TableHead>CAPEX</TableHead>
                  <TableHead>SIRET</TableHead>
                  <TableHead>Website</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Reason for Selling</TableHead>
                  <TableHead>Selling Price</TableHead>
                  <TableHead>Listing Date</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>EBITDA</TableHead>
                  <TableHead>Profit</TableHead>
                  <TableHead>Debt</TableHead>
                  <TableHead>Number of People</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedBusinesses.map((business) => (
                  <TableRow key={business.name}>
                    <TableCell className="font-medium">{business.name}</TableCell>
                    <TableCell>{business.createdAt}</TableCell>
                    <TableCell>{business.geography}</TableCell>
                    <TableCell>{business.sector}</TableCell>
                    <TableCell>${business.capex.toLocaleString()}</TableCell>
                    <TableCell>{business.siret}</TableCell>
                    <TableCell>
                      <Link href="#" className="underline" prefetch={false}>
                        {business.website}
                      </Link>
                    </TableCell>
                    <TableCell>{business.description}</TableCell>
                    <TableCell>{business.reasonForSelling}</TableCell>
                    <TableCell>${business.sellingPrice.toLocaleString()}</TableCell>
                    <TableCell>{business.listingDate}</TableCell>
                    <TableCell>
                      {business.revenue.map((r, i) => (
                        <span key={i}>
                          ${r.toLocaleString()}
                          {i < business.revenue.length - 1 && ", "}
                        </span>
                      ))}
                    </TableCell>
                    <TableCell>
                      {business.ebitda.map((e, i) => (
                        <span key={i}>
                          ${e.toLocaleString()}
                          {i < business.ebitda.length - 1 && ", "}
                        </span>
                      ))}
                    </TableCell>
                    <TableCell>
                      {business.profit.map((p, i) => (
                        <span key={i}>
                          ${p.toLocaleString()}
                          {i < business.profit.length - 1 && ", "}
                        </span>
                      ))}
                    </TableCell>
                    <TableCell>${business.debt.toLocaleString()}</TableCell>
                    <TableCell>{business.numPeople}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedBusinesses.map((business) => (
              <Card key={business.name} className="h-full">
                <CardHeader>
                  <CardTitle>{business.name}</CardTitle>
                  <CardDescription>{business.createdAt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Geography:</span>
                      <span className="text-sm">{business.geography}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Sector:</span>
                      <span className="text-sm">{business.sector}</span>
                    </div>
                    <div />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}


function ImageIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  )
}


function LayoutGridIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  )
}


function ListIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="8" x2="21" y1="6" y2="6" />
      <line x1="8" x2="21" y1="12" y2="12" />
      <line x1="8" x2="21" y1="18" y2="18" />
      <line x1="3" x2="3.01" y1="6" y2="6" />
      <line x1="3" x2="3.01" y1="12" y2="12" />
      <line x1="3" x2="3.01" y1="18" y2="18" />
    </svg>
  )
}


function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}