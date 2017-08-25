function result = SIR_stoch (params, initial, end_time)

state = initial; % holds the state variables S, I and R

result.time = []; % receives the time results
result.S = [];    % receives the S results
result.I = [];    % receives the I results
result.R = [];    % receives the R results

time = 0;
while (time < end_time && state.I > 0)
        
    % calculate process probabilities for current state
    probs = probablities(state, params);

    % WHEN does the next process happen?
    tau = exprnd(1/sum(probs));
    
    %update time
    time = time + tau;
    
    % determine WHICH process happens after tau
    which = process(probs);
    
    % update state
    switch which
        case 1
            state.S = state.S + 1;
        case 2
            state.S = state.S - 1;
        case 3
            state.I = state.I - 1;
        case 4
            state.R = state.R - 1;
        case 5
            state.S = state.S - 1;
            state.I = state.I + 1;
        case 6
            state.I = state.I - 1;
        case 7
            state.I = state.I - 1;
            state.R = state.R + 1;
    end
    
    % store results
    result.time = [result.time time];
    result.S = [result.S state.S];
    result.I = [result.I state.I];
    result.R = [result.R state.R];
    
end


function which = process (probs)
% Determines which process happens

beta = rand * sum(probs);
which = 1;
s = probs(1);
while (beta > s)
    which = which + 1;
    s = s + probs(which);
end


function a = probablities (state, params)
% Calculates process probabilities for given state and parameters

a(1) = params.m * (state.S + state.I + state.R); % host birth
a(2) = params.m * state.S; % death of susceptible host
a(3) = params.m * state.I; % death of infected host (unrelated to infection)
a(4) = params.m * state.R; % death of recovered host
a(5) = params.alpha * state.S * state.I; % infection
a(6) = params.gamma * state.I; % death due to infection
a(7) = params.beta * state.I; % recovery

