import React from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { plusIcon } from '@progress/kendo-svg-icons';
import APIKeysGrid from '../internal-building-blocks/api-keys-grid';

export default function ApiKeys() {
  return (
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
  );
}