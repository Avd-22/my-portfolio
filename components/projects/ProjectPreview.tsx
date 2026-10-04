import SchoolPreview from './SchoolPreview';
import ChatPreview from './ChatPreview';
import SecurityPreview from './SecurityPreview';
const PREVIEWS = { school: SchoolPreview, chat: ChatPreview, chart: SecurityPreview };
export default function ProjectPreview({ type }: { type: 'school' | 'chat' | 'chart' }) {
  const PreviewContent = PREVIEWS[type];
  return (
    <div className={'preview ' + type} aria-hidden="true">
      <div className="mocktop">
        <i />
        <i />
        <i />
        <span>
          {type === 'school'
            ? 'brainstake / overview'
            : type === 'chat'
              ? 'connectbud / conversations'
              : 'cloudarmour / analytics'}
        </span>
      </div>
      <div className="mockbody">
        <div className="mockrail">
          <b>◈</b>
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="mockcontent">
          <PreviewContent />
        </div>
      </div>
    </div>
  );
}
