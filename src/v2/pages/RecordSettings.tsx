import { Layout } from "@/v2/components/Layout";
import { FlexBox } from "@common/index";
import { Records } from "@components/Records";

export const RecordSettings = () => {
  return (
    <Layout>
      <FlexBox sx={{ width: "100%", height: "100%" }}>
        <Records />
      </FlexBox>
    </Layout>
  );
};
