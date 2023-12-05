import { Layout } from "@/v2/components/Layout";
import { TemplatePanel } from "@/v2/components/settings/TemplatePanel";
import { Tab, Tabs } from "@common/Tab";
import { H3 } from "@common/Typography";
import { Column, FlexBox, FullColumn } from "@common/index";
import AddTemplateModal from "@components/modals/AddTemplateModal";
import { AddBox } from "@mui/icons-material";
import { TabContext } from "@mui/lab";
import { useGetTemplateCategoriesQuery } from "@reducers/api/templateCategories";
import { useGetTemplatesQuery } from "@reducers/api/templates";
import { useEffect, useState } from "react";

export const TemplateSettings = () => {
  const { data: templates } = useGetTemplatesQuery();
  const { data: templateCategories } = useGetTemplateCategoriesQuery();
  const [tabValue, setTabValue] = useState("1");
  const [isAddTemplateModalOpen, setIsAddTemplateModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);

  useEffect(() => {
    if (templates?.[0]?.id) {
      setTabValue(String(templates?.[0]?.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templates?.[0]?.id]);

  const selectedTemplate = templates?.find(
    (template) => String(template.id) === tabValue,
  );

  return (
    <Layout>
      <FullColumn sx={{ p: 3 }}>
        <TabContext value={tabValue}>
          <FlexBox
            sx={{
              gap: 3,
            }}
          >
            <Tabs
              value={tabValue}
              onChange={(_, value) => {
                if (value) {
                  setTabValue(value);
                }
              }}
              orientation='vertical'
              sx={{
                overflow: "visible",
              }}
            >
              <Column>
                <AddTemplateModal
                  isOpen={isAddTemplateModalOpen}
                  category={selectedCategory}
                  onClose={() => setIsAddTemplateModalOpen(false)}
                  key={selectedCategory}
                />
                {templateCategories?.map((category) => {
                  return (
                    <Column key={category.id}>
                      <FlexBox sx={{ justifyContent: "space-between" }}>
                        <H3>{category.name}</H3>
                        <AddBox
                          sx={{
                            cursor: "pointer",
                            color: "#ec6245",
                          }}
                          onClick={() => {
                            setSelectedCategory(category.id);
                            setIsAddTemplateModalOpen(true);
                          }}
                        />
                      </FlexBox>

                      {templates?.map((template) => {
                        if (template.category !== category.id) {
                          return null;
                        }

                        const isActive = tabValue === String(template.id);

                        return (
                          <Tab
                            value={String(template.id)}
                            label={template.name}
                            key={template.id}
                            disableRipple
                            sx={{
                              ...(isActive && {
                                backgroundColor: "grey.200",
                              }),
                              textAlign: "left",
                              width: "100%",
                            }}
                            onClick={() => {
                              setTabValue(String(template.id));
                            }}
                          />
                        );
                      })}
                    </Column>
                  );
                })}
              </Column>
            </Tabs>

            {selectedTemplate && <TemplatePanel template={selectedTemplate} />}
          </FlexBox>
        </TabContext>
      </FullColumn>
    </Layout>
  );
};

// const CustomTab = ({ value, label, ...props }: any) => {
//   return (
//     <Box
//       // value={String(category.id)}
//       // label={category.name}
//       sx={{
//         boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
//         borderRadius: "3px",
//         padding: 2,
//         maxWidth: "180px",
//         ":hover": {
//           cursor: "pointer",
//           backgroundColor: "grey.200",
//         },
//       }}
//       {...props}
//     >
//       {props.children}
//     </Box>
//   );
// };
