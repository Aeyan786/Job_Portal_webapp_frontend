import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Delete, Edit2, MoreHorizontal, Trash2 } from "lucide-react";
import getAllCompanies from "@/hooks/getAllCompanies";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_END_POINT } from "@/lib/Endpoint";
import { toast } from "sonner";
import { setCompanies } from "@/Redux/companySlice";

const CompaniesTable = () => {
  getAllCompanies();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { Companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );

  const [filterCompany, setFilterCompany] = useState(Companies);

  useEffect(() => {
    const filteredCompanies =
      Companies.length > 0
        ? Companies.filter((e) => {
            if (!searchCompanyByText) {
              return true;
            }
            return e?.name
              ?.toLowerCase()
              .includes(searchCompanyByText.toLowerCase());
          })
        : [];

    setFilterCompany(filteredCompanies);
  }, [Companies, searchCompanyByText]);

  const deleteCompany = async (id) => {
    try {
      const response = await axios.delete(`${COMPANY_END_POINT}/delete/${id}`, {
        withCredentials: true,
      });
      if (response.status == 200) {
        toast.success(response.data.message);
        const updatedList = Companies.filter((company) => company._id !== id);
        dispatch(setCompanies(updatedList));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>

        {filterCompany.length === 0 ? (
          <caption className="text-center my-10 text-muted-foreground">
            Looks like you haven't registerd any company yet.
          </caption>
        ) : (
          <TableBody>
            {filterCompany.map((e, i) => (
              <TableRow key={e._id || i}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={e.logo} />
                  </Avatar>
                </TableCell>
                <TableCell>{e?.name}</TableCell>
                <TableCell>{e.createdAt?.split("T")[0]}</TableCell>
                <TableCell className="text-center">
                  <Popover>
                    <PopoverTrigger className="cursor-pointer">
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div className="flex  items-center">
                        <Edit2 className="w-4" />
                        <Button
                          onClick={() => {
                            navigate(`/admin/companies/${e._id}`);
                          }}
                          variant="ghost"
                          className="hover:bg-white text-md cursor-pointer"
                        >
                          Edit
                        </Button>
                      </div>
                      <div className="flex  items-center">
                        <Trash2 className="w-4" />
                        <Button
                          onClick={() => {
                            deleteCompany(e._id);
                          }}
                          variant="ghost"
                          className="hover:bg-white text-md cursor-pointer"
                        >
                          Delete
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default CompaniesTable;
