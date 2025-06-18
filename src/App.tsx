import {
  TextBox,
  InputPrefix,
  InputSeparator,
} from '@progress/kendo-react-inputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import {
  DatePicker,
  ToggleButton,
  type ToggleButtonProps,
} from '@progress/kendo-react-dateinputs';
import { Badge } from '@progress/kendo-react-indicators';
import { SvgIcon, type SVGIcon } from '@progress/kendo-react-common';
import {
  Button,
  ButtonGroup,
  Chip,
  ChipList,
  DropDownButton,
  type ChipProps,
} from '@progress/kendo-react-buttons';
import {
  AppBar,
  AppBarSection,
  Avatar,
  Drawer,
  DrawerContent,
  DrawerItem,
  PanelBar,
  PanelBarItem,
  type DrawerItemProps,
} from '@progress/kendo-react-layout';

import './styles.css';
import { chipData, drawerItems, adminItems } from './data';

import DetectionGaugeError from './internal-building-blocks/detection-gauge-err';
import DetectionGaugeWarning from './internal-building-blocks/detection-gauge-warn';
import DetectionGaugeSuccess from './internal-building-blocks/detection-gauge-succs';
import FeaturesChart from './internal-building-blocks/features-chart';
import CostChart from './internal-building-blocks/cost-chart';
import RequestsChart from './internal-building-blocks/requests-chart';
import UsageChart from './internal-building-blocks/usage-chart';
import RateLimitsGrid from './internal-building-blocks/rate-limits-grid';
import DailyStats from './components/DailyStats';
import Usage from './components/Usage';
import Cost from './components/Cost';

import logo from '@assets/templates/ai-usage-monitoring/logo.svg?url';
import compactLogo from '@assets/templates/ai-usage-monitoring/compact-logo.svg?url';
import avatar from '@assets/templates/ai-usage-monitoring/Avatar.png?url';
import {
  bellIcon,
  caretAltDownIcon,
  chevronDownIcon,
  chevronUpIcon,
  envelopeIcon,
  exportIcon,
  menuIcon,
  plusIcon,
  searchIcon,
  userIcon,
  xIcon,
} from '@progress/kendo-svg-icons';

import React from 'react';
import APIKeysGrid from './internal-building-blocks/api-keys-grid';
import {
  CustomDrawerItem,
  CustomToggleButton,
  CustomChip,
  adminItemsRender
} from './custom-components/CustomComponents';

export default function AiUsageMonitoring() {
  const [expanded, setExpanded] = React.useState(true);
  const [items, setItems] = React.useState(drawerItems);
  const [refreshChart, setRefreshChart] = React.useState(true);

  const handleDrawerState = () => {
    setExpanded(prevState => !prevState);
    setRefreshChart(false);
  };
  const handleChartRefresh = (chartOptions: any, themeOptions: any, chartInstance: { setOptions: (arg0: any, arg1: any) => void; }) => {
    if (refreshChart) {
      chartInstance.setOptions(chartOptions, themeOptions);
    }
  };
  const onSelect = (ev: any) => {
    const currentItem = ev.itemTarget.props;
    const isParent = currentItem.text === 'Performance' || currentItem.text === 'Data Sources';
    const newData = items.map(item => {
      const {
        selected,
        dataExpanded: currentExpanded,
        id,
        ...others
      } = item;
      const isCurrentItem = currentItem.id === id;
      const nextExpanded = item.dataExpanded === undefined ? !currentExpanded : !item.dataExpanded;
      return {
        selected: isCurrentItem,
        dataExpanded: isCurrentItem && isParent ? nextExpanded : currentExpanded,
        id,
        ...others
      };
    });
    setItems(newData as any);
  };
  const data = items.map(item => {
    const {
      parentId,
      ...others
    } = item;
    if (parentId !== undefined) {
      const parentEl = items.find(parent => parent.id === parentId);
      return {
        ...others,
        visible: parentEl && parentEl.dataExpanded
      };
    }
    return item;
  });
  return (
    <>
      {/* TPNAV-1 Start */}
      <header className="k-d-contents">
        <AppBar positionMode="sticky" themeColor="dark" aria-label="appbar">
          <AppBarSection className="k-flex-basis-0 k-flex-grow k-gap-4">
            <Button svgIcon={menuIcon} fillMode="clear" themeColor="light" title='Toggle Drawer' onClick={handleDrawerState} />
            <a href="#" className="k-d-none k-d-md-flex">
              <img src={logo} alt="Logo" />
            </a>
            <a href="#" className="k-d-flex k-d-md-none">
              <img src={compactLogo} alt="Compact Logo" />
            </a>
          </AppBarSection>

          <AppBarSection
            className="k-flex-basis-0 k-flex-grow k-justify-content-center"
            aria-label="app-bar"
          >
            <div className="k-d-flex k-d-sm-none">
              <Button svgIcon={searchIcon} fillMode="clear" title="btn" />
            </div>
            <div className="k-d-none k-d-sm-flex">
              <TextBox
                prefix={() => (
                  <>
                    <InputPrefix>
                      <SvgIcon icon={searchIcon} />
                    </InputPrefix>
                    <InputSeparator />
                  </>
                )}
                placeholder="Search"
                fillMode="solid"
                style={{ width: '360px' }}
                aria-label="Search Textbox"
              />
            </div>
          </AppBarSection>

          <AppBarSection className="k-flex-basis-0 k-flex-grow k-justify-content-end k-gap-2">
            <div className="k-badge-container">
              <Button
                svgIcon={bellIcon}
                fillMode="flat"
                themeColor="light"
                title="Notifications"
              />
              <Badge
                rounded="full"
                position="inside"
                align={{ vertical: 'top', horizontal: 'end' }}
                themeColor="tertiary"
              />
            </div>

            <div className="k-badge-container k-d-none k-d-lg-block">
              <Button
                svgIcon={envelopeIcon}
                fillMode="flat"
                themeColor="light"
                title="Mail"
              />
              <Badge
                rounded="full"
                position="inside"
                align={{ vertical: 'top', horizontal: 'end' }}
                themeColor="tertiary"
                aria-label="badge"
              />
            </div>

            <span className="k-appbar-separator k-color-border"></span>
            {/* DropDownButton with Image and Text */}
            <DropDownButton
              className="k-d-inline-flex k-d-md-none"
              fillMode="flat"
              themeColor="light"
              items={adminItems}
              itemRender={adminItemsRender}
              svgIcon={userIcon}
              title="Profile"
            />

            <DropDownButton
              className="k-d-none k-d-md-inline-flex"
              fillMode="flat"
              themeColor="light"
              text="Hi admin"
              items={adminItems}
              itemRender={adminItemsRender}
              startIcon={<SvgIcon icon={userIcon} />}
              endIcon={<SvgIcon icon={caretAltDownIcon} />}
              title="Profile"
            />
            {/* End of DropDownButton with Icon and Text */}
          </AppBarSection>
        </AppBar>
      </header>
      {/* TPNAV-1 End */}

      <Drawer expanded={expanded} mode="push" aria-label='drawer' items={data} item={CustomDrawerItem} width={248} onSelect={onSelect}>
        <DrawerContent style={{ background: 'var(--panel-gradient)' }}>
          <main className="k-px-2 k-px-sm-4.5 k-px-md-6 k-px-lg-4 k-px-xl-10 k-py-2 k-py-sm-4.5 k-py-md-6 k-py-lg-4 k-py-xl-12 k-pt-8">
            <h1 className="k-h1 !k-mb-5 k-color-primary k-text-ellipsis">
              Energy Monitoring Dashboard
            </h1>

            <div className="k-display-flex k-flex-col k-gap-10">
              {/* Daily Stats */}
              <DailyStats />

              {/* Usage */}
              <Usage onRefresh={handleChartRefresh} />

              {/* Cost */}
              <div className="k-d-grid k-grid-cols-3 k-gap-10 k-gap-xl-4">
                <div className="k-col-span-3 k-col-span-xl-2 k-d-flex k-flex-col k-gap-10">
                  <Cost onRefresh={handleChartRefresh} />
                  <div className="k-flex-1 k-d-flex k-flex-col">
                    <h2 className="k-h5 !k-mb-5 k-color-subtle">Requests</h2>
                    <div
                      className="k-flex-1 k-d-flex k-flex-col k-border k-border-solid k-border-border k-bg-surface-alt k-rounded-lg"
                      style={{ background: 'var(--card-gradient)' }}
                    >
                      <div className="k-p-4 k-d-flex k-justify-content-between k-flex-wrap k-gap-2">
                        <span className="k-font-size-xl k-font-weight-bold k-color-on-app-surface">
                          Requests over time
                        </span>
                        <ButtonGroup>
                          <Button title="min">Minute</Button>
                          <Button className="k-selected" title="day">
                            Day
                          </Button>
                          <Button title="month">Month</Button>
                          <Button title="year">Year</Button>
                          <Button title="total">Total</Button>
                        </ButtonGroup>
                      </div>
                      <div className="k-flex-1 k-p-4 k-d-flex k-flex-col k-gap-4">
                        <ChipList
                          className="k-gap-2"
                          data={chipData}
                          chip={CustomChip}
                          ariaLabel="chiplist"
                        />
                        <div className="k-flex-1">
                          {/* chart with 100% height */}
                          <RequestsChart onRefresh={handleChartRefresh} />
                        </div>
                      </div>
                      <div className="k-p-2">
                        <Button
                          svgIcon={exportIcon}
                          fillMode="flat"
                          title="export"
                        >
                          Export
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="k-col-span-3 k-col-span-xl-1 k-d-flex k-flex-col k-gap-10 ">
                  <div>
                    <h2 className="k-h5 !k-mb-5 k-color-subtle">
                      Content detection
                    </h2>
                    <div className="k-d-grid k-grid-cols-3 k-gap-4">
                      {/* DASHBRDCARD-12 Start */}
                      <div
                        className="k-col-span-3 k-col-span-md-1 k-col-span-xl-3 k-d-flex k-flex-col k-border k-border-solid k-border-border k-bg-surface-alt k-overflow-x-auto k-rounded-lg"
                        style={{ background: 'var(--card-gradient)' }}
                      >
                        <div className="k-d-flex k-flex-wrap k-align-items-center k-justify-content-between k-p-4">
                          <span className="k-font-size-xl k-font-weight-bold k-color-on-app-surface">
                            Accuracy
                          </span>
                          <DatePicker
                            fillMode="flat"
                            value={new Date('6/14/2023')}
                            width={164}
                            ariaLabel='Select Accuracy Date'
                            toggleButton={CustomToggleButton}
                            title="Date"
                          />
                        </div>
                        <div className="k-flex-1 k-d-flex k-flex-col k-gap-8 k-p-4">
                          <div className="k-d-flex k-justify-content-center">
                            {/* gauge */}
                            <DetectionGaugeSuccess />
                          </div>
                          <div className="k-d-flex k-gap-2 k-flex-row k-flex-md-col k-flex-xl-row">
                            <div className="k-d-flex k-d-md-none k-d-xl-flex k-flex-1 k-flex-column k-align-items-end k-color-subtle">
                              <span className="k-font-weight-bold">112k</span>
                              <span className="k-text-right">
                                correct predictions
                              </span>
                            </div>
                            <div className="k-d-none k-d-md-flex k-d-xl-none k-flex-1 k-flex-column k-align-items-start k-color-subtle">
                              <span className="k-font-weight-bold">112k</span>
                              <span>
                                correct predictions
                              </span>
                            </div>
                            <span className="k-d-md-none k-d-xl-block k-separator k-separator-vertical k-border-border k-h-8 k-m-auto"></span>
                            <span className="k-d-none k-d-md-block k-d-xl-none k-separator k-separator-horizontal k-border-border"></span>
                            <div className="k-d-flex k-flex-1 k-flex-column k-align-items-start k-color-subtle">
                              <span className="k-font-weight-bold">3.5m</span>
                              <span>all predictions made</span>
                            </div>
                          </div>
                        </div>
                        <div className="k-p-2">
                          <Button fillMode="flat" title="view">
                            View details
                          </Button>
                        </div>
                      </div>
                      <div
                        className="k-col-span-3 k-col-span-md-1 k-col-span-xl-3 k-d-flex k-flex-col k-border k-border-solid k-border-border k-bg-surface-alt k-overflow-x-auto k-rounded-lg"
                        style={{ background: 'var(--card-gradient)' }}
                      >
                        <div className="k-p-4 k-d-flex k-flex-wrap k-align-items-center k-justify-content-between k-p-4">
                          <span className="k-font-size-xl k-font-weight-bold k-color-on-app-surface">
                            Precision
                          </span>
                          <DatePicker
                            fillMode="flat"
                            value={new Date('6/14/2023')}
                            width={164}
                            ariaLabel='Select Precision Date'
                            toggleButton={CustomToggleButton}
                            title="datepicker"
                          />
                        </div>
                        <div className="k-p-4 k-flex-1 k-d-flex k-flex-col k-gap-8 k-p-4">
                          <div className="k-d-flex k-justify-content-center">
                            {/* gauge */}
                            <DetectionGaugeWarning />
                          </div>
                          <div className="k-d-flex k-gap-2 k-flex-row k-flex-md-col k-flex-xl-row">
                            <div className="k-d-flex k-d-md-none k-d-xl-flex k-flex-1 k-flex-column k-align-items-end k-color-subtle">
                              <span className="k-font-weight-bold">112k</span>
                              <span className="k-text-right">
                                true positives
                              </span>
                            </div>
                            <div className="k-d-none k-d-md-flex k-d-xl-none k-flex-1 k-flex-column k-align-items-start k-color-subtle">
                              <span className="k-font-weight-bold">112k</span>
                              <span>
                                true positives
                              </span>
                            </div>
                            <span className="k-d-md-none k-d-xl-block k-separator k-separator-vertical k-border-border k-h-8 k-m-auto"></span>
                            <span className="k-d-none k-d-md-block k-d-xl-none k-separator k-separator-horizontal k-border-border"></span>
                            <div className="k-d-flex k-flex-1 k-flex-column k-align-items-start k-color-subtle">
                              <span className="k-font-weight-bold">3.5m</span>
                              <span>positives (true + false)</span>
                            </div>
                          </div>
                        </div>
                        <div className="k-p-2">
                          <Button fillMode="flat" title="details">
                            View details
                          </Button>
                        </div>
                      </div>
                      <div
                        className="k-col-span-3 k-col-span-md-1 k-col-span-xl-3 k-d-flex k-flex-col k-border k-border-solid k-border-border k-bg-surface-alt k-overflow-x-auto k-rounded-lg"
                        style={{ background: 'var(--card-gradient)' }}
                      >
                        <div className="k-d-flex k-flex-wrap k-align-items-center k-justify-content-between k-p-4">
                          <span className="k-font-size-xl k-font-weight-bold k-color-on-app-surface">
                            Recall
                          </span>
                          <DatePicker
                            fillMode="flat"
                            value={new Date('6/14/2023')}
                            width={164}
                            ariaLabel='Select Recall Date'
                            toggleButton={CustomToggleButton}
                            title="datepicker"
                          />
                        </div>
                        <div className="k-flex-1 k-d-flex k-flex-col k-gap-8 k-p-4">
                          <div className="k-d-flex k-justify-content-center">
                            {/* gauge */}
                            <DetectionGaugeError />
                          </div>
                          <div className="k-d-flex k-gap-2 k-flex-row k-flex-md-col k-flex-xl-row">
                            <div className="k-d-flex k-d-md-none k-d-xl-flex k-flex-1 k-flex-column k-align-items-end k-color-subtle">
                              <span className="k-font-weight-bold">112k</span>
                              <span className="k-text-right">
                                true positives
                              </span>
                            </div>
                            <div className="k-d-none k-d-md-flex k-d-xl-none k-flex-1 k-flex-column k-align-items-start k-color-subtle">
                              <span className="k-font-weight-bold">112k</span>
                              <span>true positives</span>
                            </div>
                            <span className="k-d-md-none k-d-xl-block k-separator k-separator-vertical k-border-border k-h-8 k-m-auto"></span>
                            <span className="k-d-none k-d-md-block k-d-xl-none k-separator k-separator-horizontal k-border-border"></span>
                            <div className="k-d-flex k-flex-1 k-flex-column k-align-items-start k-color-subtle">
                              <span className="k-font-weight-bold">3.5m</span>
                              <span style={{ wordWrap: 'break-word' }}>
                                true positives + false negatives
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="k-p-2">
                          <Button fillMode="flat" title="label">
                            View details
                          </Button>
                        </div>
                      </div>
                      {/* DASHBRDCARD-12 End */}
                    </div>
                  </div>
                  <div>
                    <h2 className="k-h5 !k-mb-5 k-color-subtle">Features</h2>
                    <div
                      className="k-d-flex k-flex-col k-border k-border-solid k-border-border k-bg-surface-alt k-rounded-lg"
                      style={{ background: 'var(--card-gradient)' }}
                    >
                      <div className="k-d-flex k-justify-content-between k-flex-wrap k-gap-2 k-p-4">
                        <div className="k-font-size-xl k-font-weight-bold k-color-on-app-surface">
                          Top Features Used
                        </div>
                        <DropDownList
                          data={[
                            'Text generation',
                            'Image generation',
                            'Music and audio creation',
                          ]}
                          fillMode={'flat'}
                          value="Generative AI"
                          style={{
                            width: '225px',
                          }}
                          ariaLabel="Select Top Features Used"
                        />
                      </div>
                      <div className="k-flex-1 k-d-flex k-justify-content-center k-p-4">
                        {/* chart */}
                        <FeaturesChart onRefresh={handleChartRefresh} />
                      </div>
                      <div className="k-p-2">
                        <Button
                          svgIcon={exportIcon}
                          fillMode="flat"
                          title="btn"
                        >
                          Export
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rate Limits */}
              <div>
                <h2 className="k-h5 !k-mb-5 k-color-subtle">Rate Limits</h2>
                <div
                  className="k-flex-1 k-d-flex k-flex-col k-border k-border-solid k-border-border k-bg-surface-alt k-rounded-lg"
                  style={{ background: 'var(--card-gradient)' }}
                >
                  <div className="k-p-4 k-d-flex k-justify-content-between k-flex-wrap k-gap-2 k-align-items-center">
                    <span className="k-font-size-xl k-font-weight-bold k-color-on-app-surface">
                      Rate limits
                    </span>
                    <DatePicker
                      value={new Date('6/14/2023')}
                      fillMode="flat"
                      width={164}
                      ariaLabel='Select Rate limits Date'
                      toggleButton={CustomToggleButton}
                      title="datepicker"
                    />
                  </div>
                  <div className="k-p-4 k-flex-1">
                    <RateLimitsGrid />
                  </div>
                  <div className="k-p-2">
                    <Button fillMode="flat" title="all">
                      View all
                    </Button>
                  </div>
                </div>
              </div>

              {/* Members */}
              <div>
                <h2 className="k-h5 !k-mb-5 k-color-subtle">Members</h2>
                {/* DASHBRDCARD-12 Start */}
                <div className="k-d-flex k-flex-col k-border k-border-solid k-border-border k-bg-surface-alt k-rounded-lg">
                  <div className="k-font-size-xl k-font-weight-bold k-color-on-app-surface k-p-4">
                    Members
                  </div>
                  <div className="k-p-4">
                    <PanelBar aria-label="panelbar">
                      <PanelBarItem expanded={true} title="Admin">
                        <div>
                          <div className="k-d-flex k-align-items-flex-start k-gap-2 k-p-2.5">
                            <div className="k-badge-container">
                              <Avatar className="!k-m-0">
                                <img src={avatar} alt="Avatar Image" />
                              </Avatar>
                              <Badge
                                cutoutBorder
                                rounded="full"
                                position="inside"
                                align={{ vertical: 'bottom', horizontal: 'end' }}
                                themeColor="success"
                              />
                            </div>
                            <div className="k-d-flex k-line-height-lg k-flex-col k-gap-1">
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Name
                                </div>
                                <div className="k-color-on-app-surface">
                                  Mozelle_Weissnat82
                                </div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Last Active Time
                                </div>
                                <div className="k-color-on-app-surface">
                                  Mon Sep 30 2024 10:13:47{' '}
                                </div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Total Active Hours
                                </div>
                                <div className="k-color-on-app-surface">
                                  10 278
                                </div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Engagement
                                </div>
                                <div className="k-color-on-app-surface">65%</div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Messages Sent
                                </div>
                                <div className="k-color-on-app-surface">2793</div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Comments Made
                                </div>
                                <div className="k-color-on-app-surface">2082</div>
                              </div>
                            </div>
                          </div>
                          <div className="k-d-flex k-align-items-flex-start k-gap-2 k-p-2.5">
                            <div className="k-badge-container">
                              <Avatar className="!k-m-0" type="icon">
                                <img src={avatar} alt="Avatar Image" />
                              </Avatar>
                              <Badge
                                cutoutBorder
                                rounded="full"
                                position="inside"
                                align={{ vertical: 'bottom', horizontal: 'end' }}
                                themeColor="success"
                              ></Badge>
                            </div>
                            <div className="k-d-flex k-flex-col k-gap-1">
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Name
                                </div>
                                <div className="k-color-on-app-surface">
                                  Madeline_Murray6
                                </div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Last Active Time
                                </div>
                                <div className="k-color-on-app-surface">
                                  Sat Jul 27 2024 04:47:27{' '}
                                </div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Total Active Hours
                                </div>
                                <div className="k-color-on-app-surface">
                                  52 220
                                </div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Engagement
                                </div>
                                <div className="k-color-on-app-surface">84%</div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Messages Sent
                                </div>
                                <div className="k-color-on-app-surface">
                                  16 727
                                </div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Comments Made
                                </div>
                                <div className="k-color-on-app-surface">
                                  14 605
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </PanelBarItem>
                      <PanelBarItem title="User">
                        <div>
                          <div className="k-d-flex k-align-items-flex-start k-gap-2 k-p-2.5">
                            <div className="k-badge-container">
                              <Avatar className="!k-m-0">
                                <img src={avatar} alt="Avatar Image" />
                              </Avatar>
                              <Badge
                                cutoutBorder
                                rounded="full"
                                position="inside"
                                align={{ vertical: 'bottom', horizontal: 'end' }}
                                themeColor="success"
                              />
                            </div>
                            <div className="k-d-flex k-line-height-lg k-flex-col k-gap-1">
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Name
                                </div>
                                <div className="k-color-on-app-surface">
                                  Mozelle_Weissnat82
                                </div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Last Active Time
                                </div>
                                <div className="k-color-on-app-surface">
                                  Mon Sep 30 2024 10:13:47{' '}
                                </div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Total Active Hours
                                </div>
                                <div className="k-color-on-app-surface">
                                  10 278
                                </div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Engagement
                                </div>
                                <div className="k-color-on-app-surface">65%</div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Messages Sent
                                </div>
                                <div className="k-color-on-app-surface">2793</div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Comments Made
                                </div>
                                <div className="k-color-on-app-surface">2082</div>
                              </div>
                            </div>
                          </div>
                          <div className="k-d-flex k-align-items-flex-start k-gap-2 k-p-2.5">
                            <div className="k-badge-container">
                              <Avatar className="!k-m-0" type="icon">
                                <img src={avatar} alt="Avatar Image" />
                              </Avatar>
                              <Badge
                                cutoutBorder
                                rounded="full"
                                position="inside"
                                align={{ vertical: 'bottom', horizontal: 'end' }}
                                themeColor="success"
                              ></Badge>
                            </div>
                            <div className="k-d-flex k-flex-col k-gap-1">
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Name
                                </div>
                                <div className="k-color-on-app-surface">
                                  Madeline_Murray6
                                </div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Last Active Time
                                </div>
                                <div className="k-color-on-app-surface">
                                  Sat Jul 27 2024 04:47:27{' '}
                                </div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Total Active Hours
                                </div>
                                <div className="k-color-on-app-surface">
                                  52 220
                                </div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Engagement
                                </div>
                                <div className="k-color-on-app-surface">84%</div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Messages Sent
                                </div>
                                <div className="k-color-on-app-surface">
                                  16 727
                                </div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Comments Made
                                </div>
                                <div className="k-color-on-app-surface">
                                  14 605
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </PanelBarItem>
                      <PanelBarItem title="Support/Helpdesk">
                        <div>
                          <div className="k-d-flex k-align-items-flex-start k-gap-2 k-p-2.5">
                            <div className="k-badge-container">
                              <Avatar className="!k-m-0">
                                <img src={avatar} alt="Avatar Image" />
                              </Avatar>
                              <Badge
                                cutoutBorder
                                rounded="full"
                                position="inside"
                                align={{ vertical: 'bottom', horizontal: 'end' }}
                                themeColor="success"
                              />
                            </div>
                            <div className="k-d-flex k-line-height-lg k-flex-col k-gap-1">
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Name
                                </div>
                                <div className="k-color-on-app-surface">
                                  Mozelle_Weissnat82
                                </div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Last Active Time
                                </div>
                                <div className="k-color-on-app-surface">
                                  Mon Sep 30 2024 10:13:47{' '}
                                </div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Total Active Hours
                                </div>
                                <div className="k-color-on-app-surface">
                                  10 278
                                </div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Engagement
                                </div>
                                <div className="k-color-on-app-surface">65%</div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Messages Sent
                                </div>
                                <div className="k-color-on-app-surface">2793</div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Comments Made
                                </div>
                                <div className="k-color-on-app-surface">2082</div>
                              </div>
                            </div>
                          </div>
                          <div className="k-d-flex k-align-items-flex-start k-gap-2 k-p-2.5">
                            <div className="k-badge-container">
                              <Avatar className="!k-m-0" type="icon">
                                <img src={avatar} alt="Avatar Image" />
                              </Avatar>
                              <Badge
                                cutoutBorder
                                rounded="full"
                                position="inside"
                                align={{ vertical: 'bottom', horizontal: 'end' }}
                                themeColor="success"
                              ></Badge>
                            </div>
                            <div className="k-d-flex k-flex-col k-gap-1">
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Name
                                </div>
                                <div className="k-color-on-app-surface">
                                  Madeline_Murray6
                                </div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Last Active Time
                                </div>
                                <div className="k-color-on-app-surface">
                                  Sat Jul 27 2024 04:47:27{' '}
                                </div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Total Active Hours
                                </div>
                                <div className="k-color-on-app-surface">
                                  52 220
                                </div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Engagement
                                </div>
                                <div className="k-color-on-app-surface">84%</div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Messages Sent
                                </div>
                                <div className="k-color-on-app-surface">
                                  16 727
                                </div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Comments Made
                                </div>
                                <div className="k-color-on-app-surface">
                                  14 605
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </PanelBarItem>
                      <PanelBarItem title="Auditor/Compliance">
                        <div>
                          <div className="k-d-flex k-align-items-flex-start k-gap-2 k-p-2.5">
                            <div className="k-badge-container">
                              <Avatar className="!k-m-0">
                                <img src={avatar} alt="Avatar Image" />
                              </Avatar>
                              <Badge
                                cutoutBorder
                                rounded="full"
                                position="inside"
                                align={{ vertical: 'bottom', horizontal: 'end' }}
                                themeColor="success"
                              />
                            </div>
                            <div className="k-d-flex k-line-height-lg k-flex-col k-gap-1">
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Name
                                </div>
                                <div className="k-color-on-app-surface">
                                  Mozelle_Weissnat82
                                </div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Last Active Time
                                </div>
                                <div className="k-color-on-app-surface">
                                  Mon Sep 30 2024 10:13:47{' '}
                                </div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Total Active Hours
                                </div>
                                <div className="k-color-on-app-surface">
                                  10 278
                                </div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Engagement
                                </div>
                                <div className="k-color-on-app-surface">65%</div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Messages Sent
                                </div>
                                <div className="k-color-on-app-surface">2793</div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Comments Made
                                </div>
                                <div className="k-color-on-app-surface">2082</div>
                              </div>
                            </div>
                          </div>
                          <div className="k-d-flex k-align-items-flex-start k-gap-2 k-p-2.5">
                            <div className="k-badge-container">
                              <Avatar className="!k-m-0" type="icon">
                                <img src={avatar} alt="Avatar Image" />
                              </Avatar>
                              <Badge
                                cutoutBorder
                                rounded="full"
                                position="inside"
                                align={{ vertical: 'bottom', horizontal: 'end' }}
                                themeColor="success"
                              ></Badge>
                            </div>
                            <div className="k-d-flex k-flex-col k-gap-1">
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Name
                                </div>
                                <div className="k-color-on-app-surface">
                                  Madeline_Murray6
                                </div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Last Active Time
                                </div>
                                <div className="k-color-on-app-surface">
                                  Sat Jul 27 2024 04:47:27{' '}
                                </div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Total Active Hours
                                </div>
                                <div className="k-color-on-app-surface">
                                  52 220
                                </div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Engagement
                                </div>
                                <div className="k-color-on-app-surface">84%</div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Messages Sent
                                </div>
                                <div className="k-color-on-app-surface">
                                  16 727
                                </div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Comments Made
                                </div>
                                <div className="k-color-on-app-surface">
                                  14 605
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </PanelBarItem>
                      <PanelBarItem title="Data Analyst">
                        <div>
                          <div className="k-d-flex k-align-items-flex-start k-gap-2 k-p-2.5">
                            <div className="k-badge-container">
                              <Avatar className="!k-m-0">
                                <img src={avatar} alt="Avatar Image" />
                              </Avatar>
                              <Badge
                                cutoutBorder
                                rounded="full"
                                position="inside"
                                align={{ vertical: 'bottom', horizontal: 'end' }}
                                themeColor="success"
                              />
                            </div>
                            <div className="k-d-flex k-line-height-lg k-flex-col k-gap-1">
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Name
                                </div>
                                <div className="k-color-on-app-surface">
                                  Mozelle_Weissnat82
                                </div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Last Active Time
                                </div>
                                <div className="k-color-on-app-surface">
                                  Mon Sep 30 2024 10:13:47{' '}
                                </div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Total Active Hours
                                </div>
                                <div className="k-color-on-app-surface">
                                  10 278
                                </div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Engagement
                                </div>
                                <div className="k-color-on-app-surface">65%</div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Messages Sent
                                </div>
                                <div className="k-color-on-app-surface">2793</div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Comments Made
                                </div>
                                <div className="k-color-on-app-surface">2082</div>
                              </div>
                            </div>
                          </div>
                          <div className="k-d-flex k-align-items-flex-start k-gap-2 k-p-2.5">
                            <div className="k-badge-container">
                              <Avatar className="!k-m-0" type="icon">
                                <img src={avatar} alt="Avatar Image" />
                              </Avatar>
                              <Badge
                                cutoutBorder
                                rounded="full"
                                position="inside"
                                align={{ vertical: 'bottom', horizontal: 'end' }}
                                themeColor="success"
                              ></Badge>
                            </div>
                            <div className="k-d-flex k-flex-col k-gap-1">
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Name
                                </div>
                                <div className="k-color-on-app-surface">
                                  Madeline_Murray6
                                </div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Last Active Time
                                </div>
                                <div className="k-color-on-app-surface">
                                  Sat Jul 27 2024 04:47:27{' '}
                                </div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Total Active Hours
                                </div>
                                <div className="k-color-on-app-surface">
                                  52 220
                                </div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Engagement
                                </div>
                                <div className="k-color-on-app-surface">84%</div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Messages Sent
                                </div>
                                <div className="k-color-on-app-surface">
                                  16 727
                                </div>
                              </div>
                              <div>
                                <div className="k-font-size-xs k-color-subtle">
                                  Comments Made
                                </div>
                                <div className="k-color-on-app-surface">
                                  14 605
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </PanelBarItem>
                    </PanelBar>
                  </div>
                  <div className="k-p-2">
                    <Button fillMode="flat" title="label">
                      View all members
                    </Button>
                  </div>
                </div>
                {/* DASHBRDCARD-12 End */}
              </div>

              {/* Api Keys Management */}
              <div>
                <h2 className="k-h5 !k-mb-5 k-color-subtle">
                  API Keys Management
                </h2>
                <div
                  className="k-flex-1 k-d-flex k-flex-col k-border k-border-solid k-border-border k-bg-surface-alt k-rounded-lg"
                  style={{ background: 'var(--card-gradient)' }}
                >
                  <div className="k-p-4 k-d-flex k-justify-content-between k-flex-wrap k-gap-2 k-align-items-center">
                    <span className="k-font-size-xl k-font-weight-bold k-color-on-app-surface">
                      API Keys
                    </span>
                    <Button svgIcon={plusIcon} fillMode="flat" title="label">
                      Generate new key
                    </Button>
                  </div>
                  <div className="k-p-4 k-flex-1">
                    <APIKeysGrid />
                  </div>
                  <div className="k-p-2">
                    <Button fillMode="flat" title="label">
                      View all
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </main>
          {/* FTR-7 Start */}
          <footer className="!k-bg-dark k-color-on-app-surface k-bg-light k-py-6 k-px-2 k-px-sm-4.5 k-px-md-6 k-px-lg-4 k-px-xl-10">
            <p className="!k-mb-0">
              Copyright &#169; 2025 Progress Software. All rights reserved.
            </p>
          </footer>
          {/* FTR-7 End */}
        </DrawerContent>
      </Drawer>
      <style>{`
      .k-drawer-wrapper {
        padding: 16px;
      }`}</style>
    </>
  );
}
