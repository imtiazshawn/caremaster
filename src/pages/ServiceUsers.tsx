import { Button } from "@common/Button";
import { Search } from "@common/Search";
import { Table } from "@common/Table";
import { Typography } from "@mui/material";
import {
  useDeleteServiceUserMutation,
  useGetServiceUsersQuery,
} from "@reducers/api/serviceUsers";

import getServiceUserColumns from "@/columns/column.serviceUsers";
import { COLORS } from "@/shared/constants/colors";

import { ServiceUser } from "$types/serviceUsers";
import Select from "@common/Select";
import { FlexBox, FullColumn } from "@common/index";
import { PageLayout } from "@components/layout/PageLayout";
import AddServiceUserModal from "@components/modals/AddServiceUserModal";
import ConfirmationDialog from "@components/modals/ConfirmationModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { allEnrollmentStatuses } from "../shared/constants/service-user";

export const ServiceUsers = () => {
  const { data: serviceUsers, isLoading, refetch } = useGetServiceUsersQuery();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedServiceUserId, setSelectedServiceUserId] =
    useState<string>("");
  const [deleteServiceUser] = useDeleteServiceUserMutation();
  const [currentStatusFilter, setCurrentStatusFilter] = useState<string>("All");
  const [searchKey, setSearchKey] = useState<string>("");

  const [isOpenServiceUserModal, setIsOpenServiceUserModal] = useState(false);

  const handleActionCallback = (dataId: string, actionType: string) => {
    if (actionType === "edit") {
      navigate(`/service-users/${dataId}`);
    } else if (actionType === "delete") {
      setSelectedServiceUserId(dataId);
      setShowDeleteModal(true);
    }
  };

  const filteredServiceUsers =
    serviceUsers
      ?.filter((serviceUser) => {
        if (currentStatusFilter === "All") {
          return true;
        }
        return serviceUser.enrollment_status === currentStatusFilter;
      })
      .filter((serviceUser) => {
        return serviceUser.name.toLowerCase().includes(searchKey.toLowerCase());
      }) ?? [];

  return (
    <PageLayout>
      <FullColumn sx={{ background: COLORS.WHITE, p: 2, marginBottom: 2 }}>
        <AddServiceUserModal
          isOpen={isOpenServiceUserModal}
          onClose={() => setIsOpenServiceUserModal(false)}
        />
        <ConfirmationDialog
          isOpen={showDeleteModal}
          onCancel={() => {
            setShowDeleteModal(false);
          }}
          onOk={async () => {
            setShowDeleteModal(false);
            await deleteServiceUser(selectedServiceUserId);
            refetch();
          }}
          title='Delete Service User'
          description='Are you sure you want to delete this service user?'
        />
        <Typography
          variant='h5'
          sx={{ fontWeight: "bold" }}
        >
          Service Users
        </Typography>
        <FlexBox
          sx={{ height: "3em", gap: 2, justifyContent: "space-between" }}
        >
          <FlexBox>
            <Search
              onChange={(value) => {
                setSearchKey(value);
              }}
              sx={{
                maxWidth: "300px",
              }}
            />
            <Select
              defaultValue='All'
              sx={{ minWidth: "150px" }}
              onChange={(e) => [
                setCurrentStatusFilter(e.target.value as string),
              ]}
              options={["All", ...allEnrollmentStatuses]}
            />
          </FlexBox>
          <Button
            variant='contained'
            className='rounded-md'
            onClick={() => setIsOpenServiceUserModal(true)}
          >
            Add Service User
          </Button>
        </FlexBox>
        <Table<ServiceUser>
          rows={filteredServiceUsers}
          columns={getServiceUserColumns(handleActionCallback)}
          isLoading={isLoading}
          onRowClick={(row) => navigate(`/service-users/${row.id}`)}
        />
        <FlexBox sx={{ justifyContent: "space-between" }}>
          <FlexBox>
            <Button variant='outlined'>Care Plan</Button>
            <Button variant='outlined'>Move To</Button>
            <Button variant='outlined'>Audit Log</Button>
          </FlexBox>
          <FlexBox>
            <Button variant='contained'>Print</Button>
            <Button variant='contained'>Download Excel</Button>
          </FlexBox>
        </FlexBox>
      </FullColumn>
    </PageLayout>
  );
};
