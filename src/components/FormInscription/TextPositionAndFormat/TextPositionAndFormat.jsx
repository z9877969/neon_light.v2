import {
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
} from "@mui/icons-material";
import {
  alignmentOptions as alignment,
  lettersFormatOptions as lettersFormat,
} from "constants";

import Box from "@mui/joy/Box";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import s from "../FormInscription.module.scss";

const textAlignmetnList = Object.values(alignment);
const lettersFormatList = Object.values(lettersFormat);

const textAlignIcons = {
  [alignment.LEFT]: <FormatAlignLeft className={s.svgIcon} />,
  [alignment.CENTER]: <FormatAlignCenter className={s.svgIcon} />,
  [alignment.RIGHT]: <FormatAlignRight className={s.svgIcon} />,
};

const letterFormatIcons = {
  [lettersFormat.NONE]: <p className={s.svgIcon}>-</p>,
  [lettersFormat.UPPERCASE]: <p className={s.svgIcon}>AA</p>,
  [lettersFormat.LOWERCASE]: <p className={s.svgIcon}>aa</p>,
  [lettersFormat.CAPITALIZE]: <p className={s.svgIcon}>Aa</p>,
};

export function TextPositionAdnFormat({
  setTextAlign,
  setLettersFormat,
  textAlign,
  lettersFormat,
}) {
  return (
    <div className={s.TextPositionAndFormat}>
      <RadioGroup
        orientation="horizontal"
        aria-label="Alignment"
        name="positionText"
        value={textAlign}
        onChange={(event) => setTextAlign(event.target.value)}
        sx={{
          gap: "8px",
          marginBottom: "8px",
        }}
      >
        {textAlignmetnList.map((align) => (
          <Box
            key={align}
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
              value={align}
              disableIcon
              overlay
              label={textAlignIcons[align]}
              sx={{
                "& .Joy-checked": {
                  backgroundColor: "#fff",
                },
              }}
              variant={textAlign === align ? "solid" : "plain"}
              slotProps={{
                input: { "aria-label": align },
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
          name="styleText"
          value={lettersFormat}
          onChange={(e) => setLettersFormat(e.target.value)}
          sx={{
            gap: "8px",
          }}
        >
          {lettersFormatList.map((format) => (
            <Box
              key={format}
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
                value={format}
                disableIcon
                overlay
                label={letterFormatIcons[format]}
                variant={format === lettersFormat ? "solid" : "plain"}
                slotProps={{
                  input: { "aria-label": format },
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
