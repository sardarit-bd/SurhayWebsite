import clsx from 'clsx';
import { serviceIcons, type ServiceId } from '../data/services';
import { scoped } from '../lib/scoped';
import { css } from '../lib/css';

interface Props {
  service: ServiceId;
  size?: number;
  className?: string;
}

export default function ServiceIcon({ service, size = 24, className }: Props) {
  const strokeWidth = +((1.5 * 24) / size).toFixed(2);

  return scoped(
    'data-c-service-icon',
    <svg
      className={clsx(['service-icon', className])}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={css(`--service-icon-size: ${size}px;`)}
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: serviceIcons[service] }}
    />
  );
}
