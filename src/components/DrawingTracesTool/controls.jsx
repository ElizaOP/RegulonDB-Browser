import React from "react";
import Style from "./dtt.module.css";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import Tooltip from "@mui/material/Tooltip";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ZoomInMapIcon from "@mui/icons-material/ZoomInMap";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ImageIcon from "@mui/icons-material/Image";
import LandscapeIcon from "@mui/icons-material/Landscape";
import Divider from "@mui/material/Divider";
import { ReImg } from "reimg";

function Controls({
  leftEndPosition,
  rightEndPosition,
  currentLeftEndPosition,
  currentRightEndPosition,
  regulatoryRegion,
  move,
  zoom,
  setGeneticElements,
  setPosLeft,
  setPosRight,
  context,
  strand,
  drawPlaceId,
  canvaId,
  drawPlaceName,
  expand,
  set_expand
}) {
  move = parseInt(`${(currentRightEndPosition - currentLeftEndPosition) * move}`, 10);
  zoom = parseInt(`${(currentRightEndPosition - currentLeftEndPosition) * zoom}`, 10);
  let aviso =
    "The Drawing Traces Tool is still under development so some elements may not be displayed properly, please if you detect any problem download the generated image and report it in the User Feedback section. ";
  return (
    <div className={Style.controls}>
      <div>
        <ButtonGroup
          variant="contained"
          size="small"
          color="info"
        >
          <Button sx={{color: "white"}} >
            Drawing Traces Tool{" "}
            <Tooltip title={aviso}>
              <WarningAmberIcon fontSize="small" color="warning" />
            </Tooltip>{" "}
          </Button>
          {context === "gene" && (
            <Tooltip title={"Regulatory region"}>
              <Button
                className="iconButton"
                onClick={() => {
                  setGeneticElements(undefined);
                  set_expand(!expand);
                  if (!expand) {
                    setPosLeft(regulatoryRegion.leftEndPosition);
                    setPosRight(regulatoryRegion.rightEndPosition);
                  } else {
                    setPosLeft(leftEndPosition);
                    setPosRight(rightEndPosition);
                  }
                }}
              >
                {!expand ? <ZoomInMapIcon sx={{ color: "white" }} /> : <ZoomOutMapIcon sx={{ color: "white" }} />}
              </Button>
            </Tooltip>
          )}
          <Tooltip title={"Reset Graphic"}>
            <Button
              className="iconButton"
              onClick={() => {
                setGeneticElements(undefined);
                set_expand(false);
                setPosLeft(leftEndPosition);
                setPosRight(rightEndPosition);
              }}
            >
              <RestartAltIcon sx={{ color: "white" }} />
            </Button>
          </Tooltip>
          <Tooltip title={"Move to left"}>
            <Button
              onClick={() => {
                setGeneticElements(undefined);
                setPosLeft(currentLeftEndPosition - move);
                setPosRight(currentRightEndPosition - move);
              }}
            >
              <ArrowLeftIcon sx={{ color: "white" }} />
            </Button>
          </Tooltip>
          <Tooltip title={"zoom in"}>
            <Button
              onClick={() => {
                setGeneticElements(undefined);
                set_expand(true);
                setPosLeft(currentLeftEndPosition + zoom);
                setPosRight(currentRightEndPosition - zoom);
              }}
            >
              <ZoomInIcon sx={{ color: "white" }} />
            </Button>
          </Tooltip>
          <Tooltip title={"zoom out"}>
            <Button
              onClick={() => {
                setGeneticElements(undefined);
                setPosLeft(currentLeftEndPosition - zoom);
                setPosRight(currentRightEndPosition + zoom);
              }}
            >
              <ZoomOutIcon sx={{ color: "white" }} />
            </Button>
          </Tooltip>
          <Tooltip title={"move to right"}>
            <Button
              onClick={() => {
                setGeneticElements(undefined);
                setPosLeft(currentLeftEndPosition + move);
                setPosRight(currentRightEndPosition + move);
              }}
            >
              <ArrowRightIcon sx={{ color: "white" }} />
            </Button>
          </Tooltip>
        </ButtonGroup>
      </div>
      <div>
        <DownloadOptions
          drawPlaceId={drawPlaceId}
          canvaId={canvaId}
          name={drawPlaceName}
        />
      </div>
    </div>
  );
}

function DownloadOptions({ drawPlaceId, canvaId, name }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const _downloadPNG = () => {
    let svg = document.getElementById(canvaId);
    ReImg.fromSvg(svg).toCanvas(function (canvas) {
      let url = canvas.toDataURL("image/png");
      let link = document.createElement("a");
      link.download = name + ".png";
      link.href = url;
      link.click();
    });
  };

  const _downloadSVG = () => {
    const svg = document.getElementById(drawPlaceId).innerHTML;
    const blob = new Blob([svg.toString()]);
    const element = document.createElement("a");
    element.download = name + ".svg";
    element.href = window.URL.createObjectURL(blob);
    element.click();
    element.remove();
  };

  return (
    <React.Fragment>
      <Button variant="contained" color="info" size="small" onClick={handleClick}>
        <FileDownloadIcon sx={{ color: "white" }} />
      </Button>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={_downloadPNG}>
          <ImageIcon /> PNG file
        </MenuItem>
        <MenuItem onClick={_downloadSVG}>
          <LandscapeIcon /> SVG file
        </MenuItem>
        <Divider />
        <MenuItem onClick={_downloadSVG}>Data JSON</MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default Controls;
