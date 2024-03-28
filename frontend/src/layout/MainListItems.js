import React, { useContext, useEffect, useReducer, useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";
import { Badge, Collapse, List } from "@material-ui/core";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import ContactPhoneOutlinedIcon from "@material-ui/icons/ContactPhoneOutlined";
import AccountTreeOutlinedIcon from "@material-ui/icons/AccountTreeOutlined";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import CodeRoundedIcon from "@material-ui/icons/CodeRounded";
import EventIcon from "@material-ui/icons/Event";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PeopleIcon from "@material-ui/icons/People";
import ListIcon from "@material-ui/icons/ListAlt";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import ForumIcon from "@material-ui/icons/Forum";
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import RotateRight from "@material-ui/icons/RotateRight";
import icoAgendamento from "../layout/icoAgendamento.png";
import icoAjuda from "../layout/icoAjuda.png";
import icoAtendimentos from "../layout/icoAtendimentos.png";
import icoCampanha from "../layout/icoCampanha.png";
import icoCampanhaConfig from "../layout/icoCampanhaConfig.png";
import icoCampanhaContatos from "../layout/icoCampanhaContatos.png";
import icoCampanhaListar from "../layout/icoCampanhaListar.png";
import icoComunicacao from "../layout/icoComunicacao.png";
import icoConexao1 from "../layout/icoConexao1.png";
import icoConexao2 from "../layout/icoConexao2.png";
import icoConfig from "../layout/icoConfig.png";
import icoContatos from "../layout/icoContatos.png";
import icoDashboard from "../layout/icoDashboard.png";
import icoEtiquetas from "../layout/icoEtiquetas.png";
import icoFinanceiro from "../layout/icoFinanceiro.png";
import icoFuncionario from "../layout/icoFuncionario.png";
import icoInformacao from "../layout/icoInformacao.png";
import icoRespostas from "../layout/icoRespostas.png";
import icoSetores from "../layout/icoSetores.png";
import icoSuporte from "../layout/icoSuporte.png";
import icoTarefas from "../layout/icoTarefas.png";
import icoChatInterno from "../layout/icoChatInterno.png";
import icoApi from "../layout/icoApi.png";

import icoIntegracoes from "../layout/icoIntegracoes.png";
import icoOpenai from "../layout/icoOpenai.png";
import icoArquivos from "../layout/icoArquivos.png";
import icoKanban from "../layout/icoKanban.png";

import './externallink.css';
import "./styles.css";

import { i18n } from "../translate/i18n";
import { WhatsAppsContext } from "../context/WhatsApp/WhatsAppsContext";
import { AuthContext } from "../context/Auth/AuthContext";
import LoyaltyRoundedIcon from '@material-ui/icons/LoyaltyRounded';
import { Can } from "../components/Can";
import { socketConnection } from "../services/socket";
import { isArray } from "lodash";
import TableChartIcon from '@material-ui/icons/TableChart';
import api from "../services/api";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import ToDoList from "../pages/ToDoList/";
import toastError from "../errors/toastError";
import { makeStyles } from "@material-ui/core/styles";
import { AllInclusive, AttachFile, BlurCircular, DeviceHubOutlined, Schedule } from '@material-ui/icons';
import usePlans from "../hooks/usePlans";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  ListSubheader: {
    height: 26,
    marginTop: "-15px",
    marginBottom: "-10px",
  },
}));


function ListItemLink(props) {
 const { icon, primary, to, className, image, link } = props;
  
  const ExternalLink = ({ to, primary, image }) => {
  return (
    <ListItem button component="a" href={to} target="_blank" rel="noopener noreferrer" className="customButton">
      <ListItemIcon>
        <img src={image} alt="Icon" externallink={{ width: '24px', height: '24px' }} />
      </ListItemIcon>
      <ListItemText primary={primary} />
    </ListItem>
  );
};

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink} rel="noopener noreferrer" className={`customButton ${className}`}>
        <img src={image} alt="Icon" className="icon" externallink={{ width: '24px', height: '24px' }} />
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

const ExternalLink = ({ to, primary, image }) => {
  return (
    <ListItem button component="a" href={to} target="_blank" rel="noopener noreferrer" className="customButton">
      <ListItemIcon>
        <img src={image} alt="Icon" externallink={{ width: '24px', height: '24px' }} />
      </ListItemIcon>
      <ListItemText primary={primary} />
    </ListItem>
  );
};

const reducer = (state, action) => {
  if (action.type === "LOAD_CHATS") {
    const chats = action.payload;
    const newChats = [];

    if (isArray(chats)) {
      chats.forEach((chat) => {
        const chatIndex = state.findIndex((u) => u.id === chat.id);
        if (chatIndex !== -1) {
          state[chatIndex] = chat;
        } else {
          newChats.push(chat);
        }
      });
    }

    return [...state, ...newChats];
  }

  if (action.type === "UPDATE_CHATS") {
    const chat = action.payload;
    const chatIndex = state.findIndex((u) => u.id === chat.id);

    if (chatIndex !== -1) {
      state[chatIndex] = chat;
      return [...state];
    } else {
      return [chat, ...state];
    }
  }

  if (action.type === "DELETE_CHAT") {
    const chatId = action.payload;

    const chatIndex = state.findIndex((u) => u.id === chatId);
    if (chatIndex !== -1) {
      state.splice(chatIndex, 1);
    }
    return [...state];
  }

  if (action.type === "RESET") {
    return [];
  }

  if (action.type === "CHANGE_CHAT") {
    const changedChats = state.map((chat) => {
      if (chat.id === action.payload.chat.id) {
        return action.payload.chat;
      }
      return chat;
    });
    return changedChats;
  }
};

const MainListItems = (props) => {
  const classes = useStyles();
  const { drawerClose, collapsed } = props;
  const { whatsApps } = useContext(WhatsAppsContext);
  const { user, handleLogout } = useContext(AuthContext);
  const [connectionWarning, setConnectionWarning] = useState(false);
  const [openCampaignSubmenu, setOpenCampaignSubmenu] = useState(false);
  const [showCampaigns, setShowCampaigns] = useState(false);
  const [showKanban, setShowKanban] = useState(false);
  const [showOpenAi, setShowOpenAi] = useState(false);
  const [showIntegrations, setShowIntegrations] = useState(false); const history = useHistory();
  const [showSchedules, setShowSchedules] = useState(false);
  const [showInternalChat, setShowInternalChat] = useState(false);
  const [showExternalApi, setShowExternalApi] = useState(false);


  const [invisible, setInvisible] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchParam] = useState("");
  const [chats, dispatch] = useReducer(reducer, []);
  const { getPlanCompany } = usePlans();
 

  useEffect(() => {
    dispatch({ type: "RESET" });
    setPageNumber(1);
  }, [searchParam]);

  useEffect(() => {
    async function fetchData() {
      const companyId = user.companyId;
      const planConfigs = await getPlanCompany(undefined, companyId);

      setShowCampaigns(planConfigs.plan.useCampaigns);
      setShowKanban(planConfigs.plan.useKanban);
      setShowOpenAi(planConfigs.plan.useOpenAi);
      setShowIntegrations(planConfigs.plan.useIntegrations);
      setShowSchedules(planConfigs.plan.useSchedules);
      setShowInternalChat(planConfigs.plan.useInternalChat);
      setShowExternalApi(planConfigs.plan.useExternalApi);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchChats();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParam, pageNumber]);

  useEffect(() => {
    const companyId = localStorage.getItem("companyId");
    const socket = socketConnection({ companyId });

    socket.on(`company-${companyId}-chat`, (data) => {
      if (data.action === "new-message") {
        dispatch({ type: "CHANGE_CHAT", payload: data });
      }
      if (data.action === "update") {
        dispatch({ type: "CHANGE_CHAT", payload: data });
      }
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    let unreadsCount = 0;
    if (chats.length > 0) {
      for (let chat of chats) {
        for (let chatUser of chat.users) {
          if (chatUser.userId === user.id) {
            unreadsCount += chatUser.unreads;
          }
        }
      }
    }
    if (unreadsCount > 0) {
      setInvisible(false);
    } else {
      setInvisible(true);
    }
  }, [chats, user.id]);

  useEffect(() => {
    if (localStorage.getItem("cshow")) {
      setShowCampaigns(true);
    }
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (whatsApps.length > 0) {
        const offlineWhats = whatsApps.filter((whats) => {
          return (
            whats.status === "qrcode" ||
            whats.status === "PAIRING" ||
            whats.status === "DISCONNECTED" ||
            whats.status === "TIMEOUT" ||
            whats.status === "OPENING"
          );
        });
        if (offlineWhats.length > 0) {
          setConnectionWarning(true);
        } else {
          setConnectionWarning(false);
        }
      }
    }, 2000);
    return () => clearTimeout(delayDebounceFn);
  }, [whatsApps]);

  const fetchChats = async () => {
    try {
      const { data } = await api.get("/chats/", {
        params: { searchParam, pageNumber },
      });
      dispatch({ type: "LOAD_CHATS", payload: data.records });
    } catch (err) {
      toastError(err);
    }
  };

  const handleClickLogout = () => {
    //handleCloseMenu();
    handleLogout();
  };

  return (
    <div onClick={drawerClose}>
      <Can
        role={user.profile}
        perform="dashboard:view"
        yes={() => (
          <ListItemLink
            to="/"
            primary="Dashboard"
            image={icoDashboard}
          />
        )}
      />
      <Divider />
      <ListItemLink
        to="/tickets"
        primary={i18n.t("mainDrawer.listItems.tickets")}
        image={icoAtendimentos}
      />
	  
	  <ListItemLink
        to="/kanban"
        primary={i18n.t("CRM Kanban")}
        image={icoKanban}
      />

      <ListItemLink
        to="/quickmessages"
        primary={i18n.t("mainDrawer.listItems.quickMessages")}
        image={icoRespostas}
      />
	  
	  <ListItemLink
        to="/todolist"
        primary={i18n.t("Tarefas")}
        image={icoTarefas}
      />

      <ListItemLink
        to="/contacts"
        primary={i18n.t("mainDrawer.listItems.contacts")}
        image={icoContatos}
      />

      <ListItemLink
        to="/schedules"
        primary={i18n.t("mainDrawer.listItems.schedules")}
        image={icoAgendamento}
      />

      <ListItemLink
        to="/tags"
        primary={i18n.t("mainDrawer.listItems.tags")}
        image={icoEtiquetas}
      />

      <ListItemLink
        to="/chats"
        primary={i18n.t("mainDrawer.listItems.chats")}
        image={icoChatInterno}
      />
      <Divider />
      <ListItemLink
        to="/helps"
        primary={i18n.t("Tutoriais")}
        image={icoAjuda}
      />
       <ExternalLink
             to="https://wa.me/5519971395449?text=Preciso+de+ajuda"
             primary={i18n.t("Suporte")}
             image={icoSuporte}
            />
			<Divider />
       <Can
        role={user.profile}
        perform="drawer-admin-items:view"
        yes={() => (
          <>
            
            <ListSubheader inset>
             
            </ListSubheader>

            {user.super && (
              <ListItemLink
                to="/announcements"
                primary={i18n.t("mainDrawer.listItems.annoucements")}
                image={icoAgendamento}
              />
            )}
            {showOpenAi && (
              <ListItemLink
                to="/prompts"
                primary={i18n.t("mainDrawer.listItems.prompts")}
                image={icoOpenai}
              />
            )}

            {showIntegrations && (
              <ListItemLink
                to="/queueintegration"
                primary={i18n.t("mainDrawer.listItems.queueIntegration")}
                image={icoIntegracoes}
              />
            )}
        <ListItemLink
              to="/connections"
              primary={i18n.t("mainDrawer.listItems.connections")}
              image={icoConexao1}
            />
            <ListItemLink
              to="/files"
              primary={i18n.t("mainDrawer.listItems.files")}
              image={icoArquivos}
            />
            <ListItemLink
              to="/queues"
              primary={i18n.t("mainDrawer.listItems.queues")}
              image={icoSetores}
            />
            <ListItemLink
              to="/users"
              primary={i18n.t("mainDrawer.listItems.users")}
              image={icoFuncionario}
            />
            {showExternalApi && (
              <>
                <ListItemLink
                  to="/messagesapi"
                  primary={i18n.t("mainDrawer.listItems.messagesAPI")}
                  image={icoApi}
                />
              </>
            )}
			<Divider />
			<ListItemLink
             to="/Campaigns"
             primary={i18n.t("Campanhas")}
             image={icoCampanha}
           />
           <ListItemLink
             to="/ContactLists"
             primary={i18n.t("Criar Listas")}
             image={icoCampanhaListar}
           />
           <ListItemLink
             to="/CampaignsConfig"
             primary={i18n.t("Config. Campanhas")}
             image={icoCampanhaConfig}
			  />
			  <Divider />
            <ListItemLink
              to="/financeiro"
              primary={i18n.t("mainDrawer.listItems.financeiro")}
              image={icoFinanceiro}
            />

            <ListItemLink
              to="/settings"
              primary={i18n.t("mainDrawer.listItems.settings")}
              image={icoConfig}
            />
			
			
            {!collapsed && <React.Fragment>
              <Divider />
              {/* 
              // IMAGEM NO MENU
              <Hidden only={['sm', 'xs']}>
                <img style={{ width: "100%", padding: "10px" }} src={logo} alt="image" />            
              </Hidden> 
              */}
              <Typography style={{ fontSize: "12px", padding: "10px", textAlign: "right", fontWeight: "bold" }}>
                Versão: 2024 5.0.0
              </Typography>
            </React.Fragment>
            }
			
          </>
        )}
      />
    </div>
  );
};

export default MainListItems;