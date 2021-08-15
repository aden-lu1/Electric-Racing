/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Link } from 'react-router-dom';
import { WorkPackage } from 'utils';
import { routes } from '../../../../../shared/routes';
import BulletList from '../../../../shared/bullet-list/bullet-list';
import './work-package-changes.module.css';

interface WorkPackageChangesProps {
  workPackage: WorkPackage;
}

const WorkPackageChanges: React.FC<WorkPackageChangesProps> = ({ workPackage }) => {
  return (
    <BulletList
      title={'Changes'}
      headerRight={<></>}
      list={workPackage.changes.map((ic) => (
        <>
          [<Link to={`${routes.CHANGE_REQUESTS}/${ic.crId}`}>#{ic.crId}</Link>] {ic.detail}
        </>
      ))}
    />
  );
};

export default WorkPackageChanges;
