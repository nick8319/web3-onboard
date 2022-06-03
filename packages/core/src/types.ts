import type { SvelteComponent } from 'svelte'

import type {
  AppMetadata,
  Device,
  WalletInit,
  EIP1193Provider,
  WalletModule,
  Chain,
  TokenSymbol
} from '@web3-onboard/common'

import type setChain from './chain'
import type connect from './connect'
import type disconnect from './disconnect'
import type { state } from './store'
import type en from './i18n/en.json'
import type { EthereumTransactionData } from 'bnc-sdk/dist/types/src/interfaces'

export interface InitOptions {
  dappId?: string
  wallets: WalletInit[]
  chains: Chain[]
  appMetadata?: AppMetadata
  i18n?: i18nOptions
  accountCenter?: AccountCenterOptions
  notify?: NotifyOptions
}

export interface OnboardAPI {
  connectWallet: typeof connect
  disconnectWallet: typeof disconnect
  setChain: typeof setChain
  state: typeof state
}
export interface ConnectOptions {
  autoSelect?: { label: string; disableModals: boolean }
}

export interface ConnectOptionsString {
  autoSelect?: string
}

export interface DisconnectOptions {
  label: string // wallet name to disconnect
}

export interface WalletWithLoadedIcon extends Omit<WalletModule, 'getIcon'> {
  icon: string
}

export interface WalletWithLoadingIcon
  extends Omit<WalletWithLoadedIcon, 'icon'> {
  icon: Promise<string>
}

export type ConnectedChain = {
  id: Chain['id']
  namespace: Chain['namespace']
}

export interface WalletState {
  label: string //  wallet name
  icon: string // wallet icon svg string
  provider: EIP1193Provider
  accounts: Account[]
  // in future it will be possible that a wallet
  // is connected to multiple chains at once
  chains: ConnectedChain[]
  instance?: unknown
}

export type Account = {
  address: Address
  ens: Ens | null
  balance: Balances | null
}

export type Balances = Record<TokenSymbol, string> | null

export interface Ens {
  name: string
  avatar: Avatar | null
  contentHash: string | null
  getText: (key: string) => Promise<string | undefined>
}

export type Avatar = {
  url: string
  linkage: Array<{ type: string; content: string }>
}

export type Address = string

export interface AppState {
  chains: Chain[]
  walletModules: WalletModule[]
  wallets: WalletState[]
  accountCenter: AccountCenter
  locale: Locale
}

export type InternalState = {
  svelteInstance: SvelteComponent | null
  appMetadata: AppMetadata | null
  device: Device | null
}

export type Locale = string
export type i18nOptions = Record<Locale, i18n>
export type i18n = typeof en

export type AccountCenterPosition =
  | 'topRight'
  | 'bottomRight'
  | 'bottomLeft'
  | 'topLeft'

export type AccountCenter = {
  enabled: boolean
  position?: AccountCenterPosition
  expanded?: boolean
  minimal?: boolean
}

export type AccountCenterOptions = {
  desktop: Omit<AccountCenter, 'expanded'>
  mobile: Omit<AccountCenter, 'expanded'>
}

export type NotifyOptions = {
  /**
   * Disable transaction notifications, defaults to false
   */
  disable?: boolean
  /**
   * Return a custom notification object for a transaction event
   * Return false to disable notification for transaction event
   * Return undefined for the default notification
   */
  customizer?: (
    event: EthereumTransactionData
  ) => CustomNotification | void | boolean
}

export type Notification = {
  id: string
  type: NotificationType
  startTime?: number
  eventCode: string
  message: string
  autoDismiss: number
  onclick?: (event: Event) => void
  link?: string
}

export type CustomNotification = Partial<Omit<Notification, 'id' | 'startTime'>>

export type NotificationType = 'pending' | 'success' // | 'error' | 'hint'

// ==== ACTIONS ==== //
export type Action =
  | AddChainsAction
  | AddWalletAction
  | UpdateWalletAction
  | RemoveWalletAction
  | ResetStoreAction
  | UpdateAccountAction
  | UpdateAccountCenterAction
  | SetWalletModulesAction
  | SetLocaleAction

export type AddChainsAction = { type: 'add_chains'; payload: Chain[] }
export type AddWalletAction = { type: 'add_wallet'; payload: WalletState }

export type UpdateWalletAction = {
  type: 'update_wallet'
  payload: { id: string } & Partial<WalletState>
}

export type RemoveWalletAction = {
  type: 'remove_wallet'
  payload: { id: string }
}

export type ResetStoreAction = {
  type: 'reset_store'
  payload: unknown
}

export type UpdateAccountAction = {
  type: 'update_account'
  payload: { id: string; address: string } & Partial<Account>
}

export type UpdateAccountCenterAction = {
  type: 'update_account_center'
  payload: AccountCenter | Partial<AccountCenter>
}

export type SetWalletModulesAction = {
  type: 'set_wallet_modules'
  payload: WalletModule[]
}

export type SetLocaleAction = {
  type: 'set_locale'
  payload: string
}

// ==== MISC ==== //
export type ChainStyle = {
  icon: string
  color: string
}

export type NotifyEventStyles = {
  backgroundColor: string
  borderColor: string
  eventIcon: string
}
