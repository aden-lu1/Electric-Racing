import ProjectsTable from '../../containers/projects-table/projects-table';
import './projects.module.css';

const Projects: React.FC = () => {
  return (
    <div>
      <h1>This is the Projects Page</h1>
      <ProjectsTable />
    </div>
  );
};

export default Projects;
