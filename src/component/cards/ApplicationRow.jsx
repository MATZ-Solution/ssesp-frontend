const getStatusConfig = (status) => ({
  pending:  { bg: 'bg-amber-50',   text: 'text-amber-700',  dot: 'bg-amber-400',   label: 'Pending'  },
  approved: { bg: 'bg-emerald-50', text: 'text-emerald-700',dot: 'bg-emerald-400', label: 'Approved' },
  rejected: { bg: 'bg-rose-50',    text: 'text-rose-700',   dot: 'bg-rose-400',    label: 'Rejected' },
})[status];

const ApplicationRow = ({ application }) => {
  const sc = getStatusConfig(application.status);

  return (
    <tr className="table-row" style={{ borderTop: '1px solid #f1f5f9' }}>
      <td style={{ padding: '14px 20px', fontSize: 13, color: '#64748b', fontFamily: 'monospace', letterSpacing: '0.02em' }}>
        {application.id}
      </td>
      <td style={{ padding: '14px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: `hsl(${application.name.charCodeAt(0) * 15 % 360}, 60%, 92%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 700,
              color: `hsl(${application.name.charCodeAt(0) * 15 % 360}, 60%, 35%)`,
            }}
          >
            {application.name[0]}
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{application.name}</span>
        </div>
      </td>
      {/* Grade, School Type, Date, Status, Actions */}
    </tr>
  );
};

export default ApplicationRow;