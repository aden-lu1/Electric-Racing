/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { WorkPackage, WbsNumber } from 'utils';
import { wbsPipe } from '../../../../shared/pipes';
import { useSingleProject } from '../../../../services/projects.hooks';
import ProjectDetails from './project-details/project-details';
import WorkPackageSummary from './work-package-summary/work-package-summary';
import LoadingIndicator from '../../../shared/loading-indicator/loading-indicator';
import ErrorPage from '../../../shared/error-page/error-page';
import PageTitle from '../../../shared/page-title/page-title';
import PageBlock from '../../../shared/page-block/page-block';
import RulesList from './rules-list/rules-list';
import './project-container.module.css';
import DescriptionList from '../work-package-container/description-list/description-list';

interface ProjectContainerProps {
  wbsNum: WbsNumber;
}

const ProjectContainer: React.FC<ProjectContainerProps> = ({ wbsNum }: ProjectContainerProps) => {
  const { isLoading, isError, data, error } = useSingleProject(wbsNum);

  if (isLoading) return <LoadingIndicator />;

  if (isError) return <ErrorPage message={error?.message} />;

  return (
    <div className="mb-5">
      <PageTitle title={`${wbsPipe(wbsNum)} - ${data!.name}`} />
      <ProjectDetails project={data!} />
      <PageBlock
        title={'Work Packages'}
        headerRight={<></>}
        body={
          <>
            {data!.workPackages.map((ele: WorkPackage) => (
              <div key={wbsPipe(ele.wbsNum)} className="mt-3">
                <WorkPackageSummary workPackage={ele} />
              </div>
            ))}
          </>
        }
      />
      <RulesList rules={data!.rules} />
      <DescriptionList items={data!.goals} />
      <DescriptionList items={data!.otherConstraints} />
    </div>
  );
};

export default ProjectContainer;
