import { useState, useRef } from 'react';
import { TextField, Box, InputAdornment, IconButton } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

function ListTitle({ title: titleProps }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      title: titleProps,
    },
  });
  const { title } = watch();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [readOnly, setReadOnly] = useState(true);
  const inputRef = useRef();

  /**
   * Update list
   */
  const handleUpdateList = () => {};

  /**
   * Edit title
   */
  const handleEditTitle = () => {
    setReadOnly(!readOnly);

    if (inputRef.current) {
      inputRef.current.children[0].children[1].focus();
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleUpdateList)}>
      <Controller
        name="title"
        control={control}
        rules={{
          required: t('Error.Title_Required'),
        }}
        render={({ field }) => (
          <TextField
            size="small"
            error={!!errors.title}
            helperText={errors.title?.message}
            InputProps={{
              readOnly,
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton disabled={!readOnly} onClick={handleEditTitle}>
                    <Edit fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...field}
            ref={(e) => {
              field.ref(e);
              inputRef.current = e;
            }}
          />
        )}
      />
    </Box>
  );
}

ListTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ListTitle;
