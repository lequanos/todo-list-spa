import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { SET_LANG } from '@/plugins/store/actions/actions';

function SelectLang() {
  // Hooks
  const lang = useSelector((state) => state.user.lang);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // Methods
  /**
   * Change the user language
   */
  const handleChangeLang = (e) => {
    dispatch({ type: SET_LANG, lang: e.target.value });
  };

  return (
    <div className="Lists--select-lang">
      <FormControl variant="filled">
        <InputLabel>{t('Lang.Select_Label')}</InputLabel>
        <Select value={lang} onChange={handleChangeLang}>
          <MenuItem value={'fr-FR'}>{t('Lang.French')}</MenuItem>
          <MenuItem value={'en-GB'}>{t('Lang.English')}</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default SelectLang;
