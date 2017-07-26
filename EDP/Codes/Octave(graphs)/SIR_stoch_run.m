function SIR_stoch_run
% Simulation of the stochastic SIR model

%params.m = 1e-4; % host death rate
params.m = 0;
params.b = 0.08; % infection rate
params.v = 0.1;  % pathogen-induced mortality rate
params.r = 0.3;  % rate of recovery



initial.S = 50;  % number of susceptible individuals
initial.I = 20;   % number of infected individuals
initial.R = 0;   % number of recovered individuals

end_time = 100;  % end of simulation time span starting a 0
run_count = 200; % number of runs

result.time = []; % collects the time results
result.S = [];    % collects the S results
result.I = [];    % collects the I results
result.R = [];    % collects the R results

% simulate several stochastic SIR models and collect data
for n=1:run_count
    out = SIR_stoch (params, initial, end_time);
    result.time = [result.time out.time];
    result.S = [result.S out.S];
    result.I = [result.I out.I];
    result.R = [result.R out.R];
end

% extract unique times and the corresponding data
[time, m, n] = unique(result.time);
S = result.S(m);
I = result.I(m);
R = result.R(m);

% calculate running averages
N = 100; % number of samples in the average
j = 1;
for i=1:N:length(time)-N+1
    meanTime(j) = mean(time(i:i+N-1));
    meanS(j) = mean(S(i:i+N-1));
    meanI(j) = mean(I(i:i+N-1));
    meanR(j) = mean(R(i:i+N-1));
    j = j + 1;
end

% plot result
figure
plot (meanTime, meanS, 'b');
hold on
plot (meanTime, meanI, 'g');
hold on
plot (meanTime, meanR, 'r');
hold off

