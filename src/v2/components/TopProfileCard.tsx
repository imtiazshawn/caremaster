import dummyProfilePic from "@assets/dummy-profile-pic.png";
import { CenteredRow, Column } from "@common/index";
import { ExpandMore } from "@mui/icons-material";
import { useGetStaffProfileQuery } from "@reducers/api/staffProfile";

export const TopProfileCard = () => {
  const { data: staffProfile } = useGetStaffProfileQuery();
  return (
    <CenteredRow
      sx={{
        gap: 1,
        marginRight: "1rem",
      }}
    >
      <img
        className='h-12  rounded-full'
        src={dummyProfilePic}
        alt='profile'
      />

      <Column
        sx={{
          color: "white",
          gap: 0,
          ml: "5px",
        }}
      >
        <span
          style={{
            fontSize: "1.2rem",
            fontWeight: 600,
          }}
        >
          {staffProfile?.user.name}
        </span>
        <span
          style={{
            fontSize: "1rem",
            fontWeight: 400,
            opacity: 0.5,
          }}
        >
          Manager
        </span>
      </Column>
      <ExpandMore
        sx={{
          ml: "5px",
          color: "#858D9D",
        }}
      />
    </CenteredRow>
  );
};
