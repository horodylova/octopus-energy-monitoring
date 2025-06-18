import React from 'react';
import {
  ToggleButton,
  type ToggleButtonProps,
} from '@progress/kendo-react-dateinputs';
import {
  Chip,
  type ChipProps,
} from '@progress/kendo-react-buttons';
import {
  DrawerItem,
  type DrawerItemProps,
} from '@progress/kendo-react-layout';
import { SvgIcon, type SVGIcon } from '@progress/kendo-react-common';
import { xIcon, chevronUpIcon, chevronDownIcon } from '@progress/kendo-svg-icons';

export const CustomDrawerItem = (props: DrawerItemProps) => {
  const { visible, dataExpanded, parentId, id, className, level, ...others } = props;
  const arrowDir = dataExpanded ? chevronUpIcon : chevronDownIcon;

  if (!props.separator) {
    return visible === false ? null : (
      <DrawerItem id={props.id} className={`${className} k-font-size-md k-align-items-center`} {...others} >
        <img src={props.image} alt="Emoji" className="k-w-4 k-h-4" />
        <span className="k-item-text">{props.text}</span>
        {dataExpanded !== undefined && (
          <SvgIcon
            icon={arrowDir}
            style={{
              marginLeft: 'auto',
            }}
          />
        )}
      </DrawerItem>
    )
  } else {
    return <DrawerItem separator={props.separator} />;
  }
};

export const CustomToggleButton = (props: ToggleButtonProps) => {
  return (
    <>
      <SvgIcon className="k-clear-value" icon={xIcon} />
      <ToggleButton {...props} title="togglebtn">
        <span className="k-icon k-i-sort-desc-sm" />
      </ToggleButton>
    </>
  );
};

export const CustomChip = (props: ChipProps) => {
  return <Chip {...props} rounded={'full'} ariaLabel="chiplist" />;
};

export const adminItemsRender = (props: { item: { icon: SVGIcon; text: string } }) => {
  return (
    <div>
      <SvgIcon icon={props.item.icon} className="k-mr-2" />
      {`${props.item.text}`}
    </div>
  );
};