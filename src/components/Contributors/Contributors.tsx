import React, {useEffect} from 'react';
import block from 'bem-cn-lite';
import {useTranslation} from 'react-i18next';

import {ContributorsProps} from '../../models';
import {ContributorAvatars} from '../ContributorAvatars';

import './Contributors.scss';

const b = block('contributors');

const Contributors: React.FC<ContributorsProps> = (props) => {
    const {users, lang, vcsType} = props;
    const {t, i18n} = useTranslation('contributors');

    useEffect(() => {
        i18n.changeLanguage(lang);
    }, [i18n, lang]);

    return (
        <div className={b()}>
            <div className={b('title')}>{t('title')}</div>
            <ContributorAvatars contributors={users} vcsType={vcsType}/>
        </div>
    );
};

export default Contributors;