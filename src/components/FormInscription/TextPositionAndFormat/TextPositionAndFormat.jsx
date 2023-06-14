// import { useState } from "react";
import Box from "@mui/joy/Box";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import s from "../FormInscription.module.scss";

export function TextPositionAdnFormat({
  onAlignmentChange,
  onFormatChange,
  alignment,
  format,
}) {
  

  return (
    <div className={s.TextPositionAndFormat}>
      <RadioGroup
        orientation="horizontal"
        aria-label="Alignment"
        name="alignment"
        value={alignment}
        onChange={(event) => onAlignmentChange(event.target.value)}
        sx={{
          gap: "8px",
          marginBottom: "8px",
        }}
      >
        {["start", "center", "end"].map((item) => (
          <Box
            key={item}
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 40,
              height: 40,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 4,
              zIndex: 0,
            }}
          >
            <Radio
              value={item}
              disableIcon
              overlay
              label={
                {
                  start: <FormatAlignLeftIcon className={s.svgIcon} />,
                  end: <FormatAlignRightIcon className={s.svgIcon} />,
                  center: <FormatAlignCenterIcon className={s.svgIcon} />,
                }[item]
              }
              sx={{
                "& .Joy-checked": {
                  backgroundColor: "#fff",
                },
              }}
              variant={alignment === item ? "solid" : "plain"}
              slotProps={{
                input: { "aria-label": item },
                action: {
                  sx: {
                    "&:hover": {
                      backgroundColor: "#fff",
                    },

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
          onChange={(event) => onFormatChange(event.target.value)}
          sx={{
            gap: "8px",
          }}
        >
          {["none", "AA", "aa", "Aa"].map((item) => (
            <Box
              key={item}
              sx={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 40,
                height: 40,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 4,
                zIndex: 0,
              }}
            >
              <Radio
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  "& .Joy-checked": {
                    backgroundColor: "#fff",
                  },
                }}
                value={item}
                disableIcon
                overlay
                label={
                  {
                    none: <p className={s.svgIcon}>-</p>,
                    AA: <p className={s.svgIcon}>AA</p>,
                    aa: <p className={s.svgIcon}>aa</p>,
                    Aa: <p className={s.svgIcon}>Aa</p>,
                  }[item]
                }
                variant={format === item ? "solid" : "plain"}
                slotProps={{
                  input: { "aria-label": item },
                  action: {
                    sx: {
                      "&:hover": {
                        backgroundColor: "#fff",
                      },
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
    </div>
  );
}

export default TextPositionAdnFormat;
