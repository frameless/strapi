import { Box, Button, Stack, Typography } from '@strapi/design-system';
import Landscape from '@strapi/icons/Landscape';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import Editor from '../Editor';
import MediaLib from '../MediaLib';

function Wysiwyg({ name, onChange, value, intlLabel, disabled, error, description, required }) {
  const { formatMessage } = useIntl();
  const [mediaLibVisible, setMediaLibVisible] = useState(false);

  const handleToggleMediaLib = () => setMediaLibVisible((prev) => !prev);

  const handleChangeAssets = (assets) => {
    let newValue = value || '';

    assets.forEach((asset) => {
      if (asset.mime.includes('image')) {
        const imgTag = `<p><img src="${asset.url}" width="${asset.width}" height="${asset.height}" alt="${asset.alt}"></img></p>`;

        newValue = `${newValue}${imgTag}`;
      }

      // Handle videos and other type of files by adding some code
    });
    onChange({ target: { name, value: newValue } });
    handleToggleMediaLib();
  };

  return (
    <>
      <Stack size={1}>
        <Box>
          <Typography variant="pi" fontWeight="bold">
            {formatMessage(intlLabel)}
          </Typography>
          {required && (
            <Typography variant="pi" fontWeight="bold" textColor="danger600">
              *
            </Typography>
          )}
        </Box>
        <Button startIcon={<Landscape />} variant="secondary" fullWidth onClick={handleToggleMediaLib}>
          Media library
        </Button>
        <Editor disabled={disabled} name={name} onChange={onChange} value={value} />
        {error && (
          <Typography variant="pi" textColor="danger600">
            {formatMessage({ id: error, defaultMessage: error })}
          </Typography>
        )}
        {description && <Typography variant="pi">{formatMessage(description)}</Typography>}
      </Stack>
      <MediaLib isOpen={mediaLibVisible} onChange={handleChangeAssets} onToggle={handleToggleMediaLib} />
    </>
  );
}

Wysiwyg.defaultProps = {
  description: '',
  disabled: false,
  error: undefined,
  intlLabel: '',
  required: false,
  value: '',
};

Wysiwyg.propTypes = {
  description: PropTypes.shape({
    id: PropTypes.string,
    defaultMessage: PropTypes.string,
  }),
  disabled: PropTypes.bool,
  error: PropTypes.string,
  intlLabel: PropTypes.shape({
    id: PropTypes.string,
    defaultMessage: PropTypes.string,
  }),
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default Wysiwyg;
