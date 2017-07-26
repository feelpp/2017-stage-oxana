% Matlab script to run scaled version of the epidemic

%% Parameters
N=109; %number of groups of boys - choose this small at first or it may take several days to run
initI=1; %initial number of infecteds
initR=0; %initial number of recovereds
initS=N-initI-initR; %initial number of suceptibles
r=(2.18E-3)*(763/N);
a=0.44036;

%% Set up variables
numS=0:N;
numR=0:N;

% number of recoverd, suceptible, and infecteds
[R,S]=meshgrid(0:N,0:N);
I=ones(N+1,N+1)*N-(S+R); 

%flip make I upper triangular, transpose makes it lower triangular
% have to flip the others to match
I=fliplr(I)';
R=fliplr(R)';
S=fliplr(S)';

% create an index matrix that maps (S,I,R) tuples that sum to N into a
% vector.  index(ss,rr) gives index in state space Q,
% S(ss,rr),I(ss,rr),R(ss,rr) gives number of sucepts, infecteds and recvds 
nn=0;
index=zeros(N+1,N+1);
for rr=1:(N+1)  %index rows of S, R N+1-rr gives number of recovereds
    for ss=1:rr  %index cols of S, R. ss-1 gives number of susceptibles
        nn=nn+1;
        index(rr,ss)=nn; % index is upper triangular
    end
end

numStates=nn; %total number of states in the state space

%% Compute the probability rate matrix
n=0;
Q=zeros(numStates); % probability rate matrix
for rr=1:(N+1)   %index rows of S, R N+1-rr gives number of recovereds 
    for ss=1:rr  %index cols of S, R. ss-1 gives number of susceptibles
        n=index(rr,ss);
        
        %S->I: S decreases by one (so we take ss-1), R
        %remains the same rate is rSI
        if ss>=2
            m=index(rr,ss-1);
            Q(n,m)=r*S(rr,ss)*I(rr,ss);
        end
        
        %I->R: I decreases by one (ss will stay the same), R increases (so
        %we need rr-1, since r is indexed backwards).  Rate is aI
        if rr>=2 && rr>ss
            m=index(rr-1,ss);
            Q(n,m)=a*I(rr,ss);
        end
        
        Q(n,n)=-sum(Q(n,:));
    end
end

%% Compute the distribution, p, as a function of time
% build an index array to map vector p to matrix p
revIndex=zeros(numStates,1); %index statevector back into matrix
for ii=1:numStates
    revIndex(ii)=find(index==ii);
end

%compute distribution
t=(0:0.1:15);
p=zeros(N+1,N+1,numel(t)); % 2d probability distribution, 1st index is S, 2nd is I, 3rd is time
p0=zeros(1,numStates);
p0(index(N+1-initR,initS+1))=1; %set initial condition
ptempsqr=zeros(N+1,N+1);
for ii=1:numel(t) % compute distribution as a function of time (solving p'=pQ, p(0)=p0)
    ptemp = p0*expm(Q*t(ii));
    ptempsqr(revIndex)=ptemp;
    p(:,:,ii)=ptempsqr;
end

%% Condition that there is always at least 1 person infected


%% visualization
figure;
h=surfc(rot90(rot90(fliplr(p(:,:,ii)))));
axis([0 N+1 0 N+1 -0.04 0.04]);
hold on;
shading flat;
for ii=1:numel(t)
    delete(h);
    h=surfc(rot90(rot90(fliplr(p(:,:,ii)))));
    title([num2str(t(ii)) ' Days']);
    xlabel('S (students)');
    ylabel('R (students)');
    zlabel('Probability');
    shading interp;
    F(ii)=getframe;
end
