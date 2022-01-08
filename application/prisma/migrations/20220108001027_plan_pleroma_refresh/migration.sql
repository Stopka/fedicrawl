update "Node"
set "refreshedAt"=NULL,
    "refreshAttemptedAt"=NULL
where "Node"."softwareName" like 'pleroma';
