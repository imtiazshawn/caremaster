import { COLORS } from "@/shared/constants/colors";
import { placeholderProfilePicture } from "@/v2/utils/constants";
import { H2, H4 } from "@common/Typography";
import { Column } from "@common/index";
import { formatUKPhoneNumber } from "../../utils/format";

type Props = {
  name: string;
  photo?: string;
  mobile?: string;
};

export const NavBarProfile: React.FC<Props> = ({ name, photo, mobile }) => {
  return (
    <Column
      sx={{
        gap: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        fontSize: "1.2rem",
        p: 3,
      }}
    >
      <img
        src={photo || placeholderProfilePicture}
        alt='profile'
        className='h-[125px] w-[125px] rounded-full'
        style={{
          objectFit: "cover",
          //   border: "2px solid rgb(25 118 210)",
          //   boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        }}
      />
      <H2 color={COLORS.GREY}>{name}</H2>
      {mobile && <H4 color={COLORS.GREY}>{formatUKPhoneNumber(mobile)}</H4>}
    </Column>
  );
};
