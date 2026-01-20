// Mapeamento de ícones light (limpos) para uso consistente
// Usamos SVGs locais e aplicamos como máscara para permitir colorir via CSS (currentColor)
// Caminhos relativos ao workspace (Vite) - assets serão empacotados
import DASHBOARD from '../../icones/SVGs/light/circles-four-light.svg';
import USERS from '../../icones/SVGs/light/users-light.svg';
import USER from '../../icones/SVGs/light/user-light.svg';
import CHARTS from '../../icones/SVGs/light/chart-bar-light.svg';
import TABLE from '../../icones/SVGs/light/table-light.svg';
import TREND_UP from '../../icones/SVGs/light/chart-line-up-light.svg';
import LOGOUT from '../../icones/SVGs/light/door-open-light.svg';
import CALENDAR from '../../icones/SVGs/light/calendar-light.svg';
import DOWNLOAD from '../../icones/SVGs/light/download-light.svg';
import FILTER from '../../icones/SVGs/light/funnel-light.svg';
import TARGET from '../../icones/SVGs/light/target-light.svg';
import SUN from '../../icones/SVGs/light/sun-light.svg';
import MOON from '../../icones/SVGs/light/moon-light.svg';
import SYSTEM from '../../icones/SVGs/light/circle-half-light.svg';
import SEARCH from '../../icones/SVGs/light/magnifying-glass-light.svg';
import EDIT from '../../icones/SVGs/light/pencil-light.svg';
import TRASH from '../../icones/SVGs/light/trash-light.svg';
import CLOCK from '../../icones/SVGs/light/clock-light.svg';
import BUILDINGS from '../../icones/SVGs/light/buildings-light.svg';
import HASH from '../../icones/SVGs/light/hash-light.svg';
import MESSAGE from '../../icones/SVGs/light/chat-light.svg';
import MAP_PIN from '../../icones/SVGs/light/map-pin-light.svg';
import CHEVRON_DOWN from '../../icones/SVGs/light/caret-down-light.svg';
import CHEVRON_UP from '../../icones/SVGs/light/caret-up-light.svg';
import CHECK from '../../icones/SVGs/light/check-light.svg';
import X from '../../icones/SVGs/light/x-light.svg';
import FOLDER_OPEN from '../../icones/SVGs/light/folder-open-light.svg';
import FILE_XLS from '../../icones/SVGs/light/file-xls-light.svg';
import MONEY from '../../icones/SVGs/light/money-light.svg';

export const ICONS = {
  dashboard: DASHBOARD,
  users: USERS || USER,
  user: USER,
  charts: CHARTS,
  table: TABLE,
  trendUp: TREND_UP,
  logout: LOGOUT,
  calendar: CALENDAR,
  download: DOWNLOAD,
  filter: FILTER,
  target: TARGET,
  sun: SUN,
  moon: MOON,
  system: SYSTEM,
  search: SEARCH,
  edit: EDIT,
  trash: TRASH,
  clock: CLOCK,
  buildings: BUILDINGS,
  hash: HASH,
  message: MESSAGE,
  mapPin: MAP_PIN,
  chevronDown: CHEVRON_DOWN,
  chevronUp: CHEVRON_UP,
  check: CHECK,
  x: X,
  folderOpen: FOLDER_OPEN,
  fileXls: FILE_XLS,
  money: MONEY,
} as const;

export type IconName = keyof typeof ICONS;
