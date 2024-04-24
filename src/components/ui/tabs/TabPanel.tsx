interface TWTabPanelProps {
  activeTab: number;
  index: number;
  children: React.ReactNode;
}

const TWTabPanel = ({ activeTab, index, children }: TWTabPanelProps) => {
  if (activeTab !== index) return null;
  return <div>{children}</div>;
};

export default TWTabPanel;
