import { useEffect, useRef, useMemo } from 'react';
import { TextField, Box } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import './List.scss';
import { UPDATE_LIST } from '@/plugins/store/actions/actions';

function ListTitle({ title: titleProps, tasks, listId, edit, setEdit }) {
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
  const inputRef = useRef();

  /**
   * Update list
   */
  const handleUpdateList = () => {
    dispatch({
      type: UPDATE_LIST,
      list: {
        id: listId,
        title,
        tasks: tasks.map((task) => ({
          id: task._id,
          title: task.title,
          endDate: task.endDate,
          status: task.status,
        })),
      },
    });
    setEdit(false);
  };

  const isCompletedList = useMemo(
    () => tasks.every((task) => task.status === 'inactive') && tasks.length,
    [tasks],
  );

  useEffect(() => {
    if (inputRef.current && edit) {
      inputRef.current.children[0].children[0].select();
    }
  }, [edit]);

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
            className={isCompletedList ? 'List--inactive' : ''}
            size="small"
            error={!!errors.title}
            helperText={errors.title?.message}
            InputProps={{
              readOnly: !edit,
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
  tasks: PropTypes.array,
  listId: PropTypes.string.isRequired,
  edit: PropTypes.bool.isRequired,
  setEdit: PropTypes.func.isRequired,
};

ListTitle.defaultProps = {
  tasks: [],
};

export default ListTitle;
