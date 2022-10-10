export type OmniHookBody = {

};

export type OmniHookTypes = {
  body: OmniHookBody;
};

export type OmniHook<T extends OmniHookTypes = OmniHookTypes> = {
  data: null;
  actionInput: OmniHookBody;
  fetcherInput: OmniHookBody;
  body: T['body'];
};

export type OmniHookSchema<T extends OmniHookTypes = OmniHookTypes> = {
  endpoint: {
    options: {};
    handlers: {
      OmniHook: OmniHook<T>;
    };
  };
};

export type OmniHookOperation = {
  data: { result?: string };
  variables: any;
};
