import * as React from "react";
import Box from "@mui/joy/Box";
import Radio, { radioClasses } from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";

export function TextPositionAdnFormat() {
  const [alignment, setAlignment] = React.useState("left");
  const [format, setFormat] = React.useState("dash");

  return (
    <>
      <RadioGroup
        orientation="horizontal"
        aria-label="Alignment"
        name="alignment"
        value={alignment}
        onChange={(event) => setAlignment(event.target.value)}
        sx={() => ({
          gap: "8px",
          marginBottom: "8px",
        })}
      >
        {["left", "center", "right"].map((item) => (
          <Box
            key={item}
            sx={() => ({
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 40,
              height: 40,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 4,
            })}
          >
            <Radio
              value={item}
              disableIcon
              overlay
              label={
                {
                  left: <FormatAlignLeftIcon />,
                  right: <FormatAlignRightIcon />,
                  center: <FormatAlignCenterIcon />,
                }[item]
              }
              variant={alignment === item ? "solid" : "plain"}
              slotProps={{
                input: { "aria-label": item },
                action: {
                  sx: {
                    borderRadius: 4,
                    transition: "none",
                  },
                },
                label: { sx: { lineHeight: 0 } },
              }}
            />
          </Box>
        ))}
      </RadioGroup>
      <>
        <RadioGroup
          orientation="horizontal"
          aria-label="Format"
          name="format"
          value={format}
          onChange={(event) => setAlignment(event.target.value)}
          sx={() => ({
            gap: "8px",
            marginBottom: "8px",
          })}
        >
          {["dash", "AA", "aa", "Aa"].map((item) => (
            <Box
              key={item}
              sx={() => ({
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 40,
                height: 40,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 4,
              })}
            >
              <Radio
                sx={() => ({
                  fontSize: "14px",
                  fontWeight: 500,
                })}
                value={item}
                disableIcon
                overlay
                label={
                  {
                    dash: "-",
                    AA: "AA",
                    aa: "aa",
                    Aa: "Aa",
                  }[item]
                }
                variant={format === item ? "solid" : "plain"}
                slotProps={{
                  input: { "aria-label": item },
                  action: {
                    sx: {
                      borderRadius: 4,
                      transition: "none",
                    },
                  },
                  label: { sx: { lineHeight: 0 } },
                }}
              />
            </Box>
          ))}
        </RadioGroup>
      </>
    </>
  );
}

export default TextPositionAdnFormat;
